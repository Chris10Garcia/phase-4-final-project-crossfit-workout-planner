#!/usr/bin/env python3

from flask import request, make_response, session, redirect, jsonify
from flask_socketio import emit, send
from flask_restful import Resource
from marshmallow import fields
from werkzeug.exceptions import InternalServerError
from sqlalchemy import exc

from config import app, db, ma, socketio
from models import Coach, Workout_Plan, Exercise_Move, Schedule


########################################################################
# SCHEMA PLANS
########################################################################

class Coach_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Coach
        load_instance = True

class Schedule_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Schedule
        load_instance = True

    coach = fields.Nested(lambda: Coach_Schema(only=("name", "id")))
    workout_plan = fields.Nested(lambda: Workout_Plan_Schema(only=("name", "id", "difficulty")))

class Exercise_Move_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Exercise_Move
        load_instance = True

class Workout_Plan_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Workout_Plan
        load_instance = True
    exercise_moves = fields.List(fields.Nested(Exercise_Move_Schema))


coach_schema = Coach_Schema(exclude=["_password_hash"])
coaches_schema = Coach_Schema(many=True, exclude=["_password_hash"])

schedule_schema = Schedule_Schema()
schedules_schema = Schedule_Schema(many = True)

exercise_move_schema = Exercise_Move_Schema()
exercise_moves_schema = Exercise_Move_Schema(many=True)

workout_plan_schema = Workout_Plan_Schema()
workout_plans_schema = Workout_Plan_Schema(many=True)



@socketio.on("connect")
def handle_connect():
    print("Client connected!")
    emit( "connected", {"data": f"id: {request.sid} is connected"})

    # refresh_all_data()


@socketio.on("new_schedule")
def handle_new_schedule(data):
    result = {
        "data" : None,
        "errors" : {},
        "ok" : False
            }
    
    coach_data = data["coach"]
    workout_plan_data = data["workout_plan"]

    del data["id"]
    del data["coach"]
    del data["workout_plan"]

    try:
        new_schedule = Schedule(**data)
        db.session.add(new_schedule)
        db.session.commit()

        new_schedule.coach = Coach.query.filter(Coach.id == coach_data["id"]).first()
        new_schedule.workout_plan = Workout_Plan.query.filter(Workout_Plan.id == workout_plan_data["id"]).first()

        db.session.add(new_schedule)
        db.session.commit()

    except Exception as e:
        error_message = str(e)
        result["errors"] = error_message
        return result

    result["data"] = schedule_schema.dump(new_schedule)
    result["ok"] = True

    # # refresh_all_data()
    return result

@socketio.on("delete_schedule")
def handle_delete_schedule(data):

    result = {
        "data" : None,
        "errors" : {},
        "ok" : False
            }
    
    scheduledclass = Schedule.query.filter(Schedule.id == data["id"]).first()
    
    db.session.delete(scheduledclass)
    db.session.commit()

    result["ok"] = True

    # # refresh_all_data()
    return result
        

@socketio.on("update_schedule")
def handle_update_schedule(data):
    result = {
        "data" : None,
        "errors" : {},
        "ok" : False
            }


    scheduledclass = Schedule.query.filter(Schedule.id == data["id"]).first()

    coach_data = data["coach"]
    workout_plan_data = data["workout_plan"]

    del data["coach"]
    del data["workout_plan"]  

    try:

        [setattr(scheduledclass, attr, data[attr]) for attr in data]


        scheduledclass.workout_plan = Workout_Plan.query.filter(Workout_Plan.id == workout_plan_data["id"]).first()
        scheduledclass.coach = Coach.query.filter(Coach.id == coach_data["id"]).first()
        
        db.session.add(scheduledclass)
        db.session.commit()

    except Exception as e:

        error_message = str(e)
        result["errors"] = error_message
        return result

    result["data"] = schedule_schema.dump(scheduledclass)
    result["ok"] = True

    return result


@socketio.on("update_workout_plan")
def handle_update_workout_plan(data):
    result = {
        "data" : None,
        "errors" : {},
        "ok" : False
            }
    
    workout_plan = Workout_Plan.query.filter(Workout_Plan.id == data["id"]).first()
    exercise_moves = data["exercise_moves"]
    exercise_moves = [Exercise_Move.query.filter(Exercise_Move.id == exercise_move["id"]).first() for exercise_move in exercise_moves]

    del data["exercise_moves"]
    workout_plan.exercise_moves.clear()

    try:
        [setattr(workout_plan, attr, data[attr]) for attr in data]
        [workout_plan.exercise_moves.append(exercise_move) for exercise_move in exercise_moves]


        db.session.add(workout_plan)
        db.session.commit()

    except Exception as e:
        error_message = str(e)
        result["errors"] = error_message
        return result
    
    result["data"] = workout_plan_schema.dump(workout_plan)
    result["ok"] = True
    
    # # refresh_all_data()
    return result

@socketio.on("new_workout_plan")
def handle_new_workout_plan(data):
    result = {
        "data" : None,
        "errors" : {},
        "ok" : False
            }
    
    exercise_moves = data["exercise_moves"]

    del data["id"]
    del data["exercise_moves"]
    

    try:
        new_workout_plan = Workout_Plan(**data)

        exercise_moves = [Exercise_Move.query.filter(Exercise_Move.id == exercise_move["id"]).first() for exercise_move in exercise_moves]
        [new_workout_plan.exercise_moves.append(exercise_move) for exercise_move in exercise_moves]
        
        db.session.add(new_workout_plan)
        db.session.commit()

    except Exception as e:
        error_message = str(e)
        result["errors"] = error_message
        return result
    
    result["data"] = workout_plan_schema.dump(new_workout_plan)
    result["ok"] = True

    # # refresh_all_data()
    return result


@socketio.on("update_exercise_move")
def handle_update_exercise_move(data):
    result = {
        "data" : None,
        "errors" : {},
        "ok" : False
            }
    exercise_move = Exercise_Move.query.filter(Exercise_Move.id == data["id"]).first()

    try:
        [setattr(exercise_move, attr, data.get(attr)) for attr in data]

    except Exception as e:
        error_message = str(e)
        result["errors"] = error_message      
        return result

    db.session.add(exercise_move)
    db.session.commit()


    result["data"] = exercise_move_schema.dump(exercise_move)
    result["ok"] = True
    # # refresh_all_data()
    return result

@socketio.on("new_exercise_moves")
def handle_new_exercise_moves(data):
    result = {
        "data" : None,
        "errors" : {},
        "ok" : False
            }
    
    del data["id"]


    try: 
        new_exercise_move = Exercise_Move(**data)
        db.session.add(new_exercise_move)
        db.session.commit()
    except Exception as e:
        error_message = str(e)
        result["errors"] =  error_message
        return result


    result["ok"] = True
    result["data"] = exercise_move_schema.dump(new_exercise_move)
    # # refresh_all_data()
    return result


@socketio.on("update_coach")
def handle_update_coach(data):
    result = {
        "data" : None,
        "errors" : {},
        "ok" : False
            }
    
    coach = Coach.query.filter(Coach.id == data["id"]).first()

    try:
        [setattr(coach, attr, data.get(attr)) for attr in data]

    except Exception as e:
        error_message = str(e)
        result["errors"] = error_message      
        return result
    
    db.session.add(coach)
    db.session.commit()

    result["data"] = coach_schema.dump(coach)
    result["ok"] = True
    # # refresh_all_data()
    return result

@socketio.on("new_coach")
def handle_new_coach(data):
    result = {
            "data" : None,
            "errors" : {},
            "ok" : False
                }
    
    del data["id"]

    try:
        new_coach = Coach(**data)
        db.session.add(new_coach)
        db.session.commit()
    except Exception as e:
        error_message = str(e)
        result["errors"] = error_message
        return result
    
    result["ok"] = True
    result["data"] = coach_schema.dump(new_coach)
    # # refresh_all_data()
    return result

@socketio.on("logout")
def handle_logout():
    pass

@socketio.on("login")
def handle_login(data):
    result = {
        "user" : None,
        "errors" : {},
        "ok" : False
            }

    username = data["username"] if "username" in data else None
    password = data["password"] if "password" in data else None

    if not username or username == "":
        result["errors"]["username"] = "Blank username, please supply username"
        
    if not password or password == "":
        result["errors"]["password"] = "Blank password, please supply password"

    if len(result["errors"]):
        return result


    user = Coach.query.filter(Coach.username == username ).first()

    if not user:
        result["errors"]["username"] = "Incorrect user or password"
        result["errors"]["password"] = "Incorrect user or password"
    
    else:
        if not user.authenticate(password):
            result["errors"]["username"] = "Incorrect user or password"
            result["errors"]["password"] = "Incorrect user or password"
    
    if len(result["errors"]):
        return result


    session["user_id"] = user.id
    session["username"] = user.username 

    # print(session)

    result["ok"] = True
    result["user"] = coach_schema.dump(user)
    return result
    

# def refresh_all_data():
#     coaches = Coach.query.all()
#     workout_plans = Workout_Plan.query.all()
#     exercise_moves = Exercise_Move.query.all()
#     schedules = Schedule.query.all()

#     emit("coaches", coaches_schema.dump(coaches))
#     emit("workout_plans", workout_plans_schema.dump(workout_plans))
#     emit("exercise_moves", exercise_moves_schema.dump(exercise_moves))
#     emit("schedules", schedules_schema.dump(schedules))


# this solved the issue!
@socketio.on("refresh")
def refresh():
    coaches = Coach.query.all()
    workout_plans = Workout_Plan.query.all()
    exercise_moves = Exercise_Move.query.all()
    schedules = Schedule.query.all()

    emit("coaches", coaches_schema.dump(coaches))
    emit("workout_plans", workout_plans_schema.dump(workout_plans))
    emit("exercise_moves", exercise_moves_schema.dump(exercise_moves))
    emit("schedules", schedules_schema.dump(schedules))

# @socketio.on("connection")
# def connection(data):
    
#     print("Client connection!!!!!")
#     coaches = Coach.query.all()

#     response = make_response(coaches_schema.dump(coaches), 200)
#     socketio.emit("connection", response)
#     # return response

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5555)