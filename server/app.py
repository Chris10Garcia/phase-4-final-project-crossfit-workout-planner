#!/usr/bin/env python3

from flask import request, make_response, session, render_template
from flask_restful import Resource
from marshmallow import fields
from werkzeug.exceptions import InternalServerError
from sqlalchemy import exc

from config import app, db, api, ma
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


########################################################################
# RESTful API VIEW ROUTES
########################################################################

#######################
# /Sessions

class ClearSession(Resource):
    def get(self):
        session["user_id"] = None
        session["username"] = None
        return {"message": "session cleared"}, 204
    
class CheckSession(Resource):
    def get(self):
        user_id = session["user_id"] if "user_id" in session else None

        if user_id:
            user = Coach.query.filter(Coach.id == user_id).first()
            return coach_schema.dump(user), 200
        
        return {"message": "Unauthorized, you are currently not logged in"}, 401

#######################
# /Login and Out 
class Login(Resource):
    def post(self):
        errors = {}
        user_data = request.get_json()

        username = user_data["username"] if "username" in user_data else None
        password = user_data["password"] if "password" in user_data else None

        if not username or username == "":
            errors["username"] = "Blank username, please supply username"
            
        if not password or password == "":
            errors["password"] = "Blank password, please supply password"

        if len(errors):
            return errors, 401
        
        user = Coach.query.filter(Coach.username == username ).first()

        if not user:
            errors["username"] = "Incorrect user or password"
            errors["password"] = "Incorrect user or password"
        else:
            
            if not user.authenticate(password):
                errors["username"] = "Incorrect user or password"
                errors["password"] = "Incorrect user or password"
        
        if len(errors):
            return errors, 401


        session["user_id"] = user.id
        session["username"] = user.username
        response = make_response(
            coach_schema.dump(user),
            200
        )
        return response

class Logout (Resource):
    def delete(self):

        user_id = session["user_id"] if "user_id" in session else None

        if not user_id or user_id == "":
            response = make_response ({"message": "No users are logged in"}, 401)
        else:
            session["user_id"] = None
            response =  {}, 204

        return response
 

 
#######################
# /coaches 

class CoachesIndex(Resource):
    def get(self):
        coaches = Coach.query.all()
        response = make_response(
            coaches_schema.dump(coaches),
            200
        )
        return response
    
    def post(self):
        ch_data = request.get_json()

        del ch_data["id"]

        try:
            new_coach = Coach(**ch_data)
            db.session.add(new_coach)
            db.session.commit()

        except Exception as e:
            error_message = str(e)
            return {"errors" :  error_message }, 400
        
        response = make_response(
            coach_schema.dump(new_coach),
            201
        )

        return response


#######################
# /coaches/id

class CoachesByID(Resource):
    def get(self, id):
        coach = Coach.query.filter(Coach.id == id).first()
        response = make_response(
            coach_schema.dump(coach),
            200
        )
        return response
  
  
    def patch(self, id):
        coach = Coach.query.filter(Coach.id == id).first()
        
        try:        
            [setattr(coach, attr, request.json.get(attr)) for attr in request.json]

            db.session.add(coach)
            db.session.commit()

        except Exception as e:
            error_message = str(e)
            return {"errors" :  error_message }, 400        

        response = make_response(
            coach_schema.dump(coach),
            200
        )
        
        return response


#######################
# /schedules

class ScheduledClassesIndex(Resource):
    def get(self):
        scheduledclasses = Schedule.query.all()
        response = make_response(
            schedules_schema.dump(scheduledclasses),
            200
        )
        return response
    
    def post(self):
        sch_data = request.get_json()
        coach_data = sch_data["coach"]
        workout_plan_data = sch_data["workout_plan"]

        del sch_data["id"]
        del sch_data["coach"]
        del sch_data["workout_plan"]

        # TO DO
        # for patching and posting, i need
        #   try / except when creating or setting the object
        # update records + update children
        try:
            new_schedule = Schedule(**sch_data)

            new_schedule.coach = Coach.query.filter(Coach.id == coach_data["id"]).first()
            new_schedule.workout_plan = Workout_Plan.query.filter(Workout_Plan.id == workout_plan_data["id"]).first()

            db.session.add(new_schedule)
            db.session.commit()

        except Exception as e:
            error_message = str(e)
            return {"errors" :  error_message }, 400   
        
        response = make_response(
            schedule_schema.dump(new_schedule),
            201
        )

        return response


#######################
# /schedules/id

class ScheduledClassesByID(Resource):
    def get(self, id):
        scheduledclass = Schedule.query.filter(Schedule.id == id).first()
        response = make_response(
            schedule_schema.dump(scheduledclass),
            200
        )
        return response

    def patch(self, id):

        scheduledclass = Schedule.query.filter(Schedule.id == id).first()
        sch_data = request.get_json()
        coach_data = sch_data["coach"]
        workout_plan_data = sch_data["workout_plan"]

        del sch_data["coach"]
        del sch_data["workout_plan"]  

        # TO DO
        # for patching and posting, i need
        #   try / except when creating or setting the object
        # update records + update children
        try:

            [setattr(scheduledclass, attr, sch_data[attr]) for attr in sch_data]

            scheduledclass.workout_plan = Workout_Plan.query.filter(Workout_Plan.id == workout_plan_data["id"]).first()
            scheduledclass.coach = Coach.query.filter(Coach.id == coach_data["id"]).first()

            db.session.add(scheduledclass)
            db.session.commit()

        except Exception as e:
            error_message = str(e)
            return {"errors" :  error_message }, 400   

        response = make_response(
            schedule_schema.dump(scheduledclass),
            200
        )

        return response
    
    def delete(self, id):

        scheduledclass = Schedule.query.filter(Schedule.id == id).first()
        
        db.session.delete(scheduledclass)
        db.session.commit()

        response = make_response(
            {"message": "Sucessful deletion of record"},
            202
        )

        return response


#######################
# /workout_plans

class WorkoutPlansIndex(Resource):
    def get(self):
        workout_plans = Workout_Plan.query.all()
        response = make_response(
            workout_plans_schema.dump(workout_plans),
            200
        )
        return response
    
    def post(self):
        wp_data = request.get_json()
        exercise_moves = wp_data["exercise_moves"]

        del wp_data["id"]
        del wp_data["exercise_moves"]
        
       
        try:
            new_workout_plan = Workout_Plan(**wp_data)

            exercise_moves = [Exercise_Move.query.filter(Exercise_Move.id == exercise_move["id"]).first() for exercise_move in exercise_moves]
            [new_workout_plan.exercise_moves.append(exercise_move) for exercise_move in exercise_moves]

        except Exception as e:
            error_message = str(e)
            return {"errors" :  error_message }, 400        

        db.session.add(new_workout_plan)
        db.session.commit()

        response = make_response(
            workout_plan_schema.dump(new_workout_plan),
            201
        )

        return response


#######################
# /workout_plans/id

class WorkoutPlansByID(Resource):
    def get(self, id):
        workout_plan = Workout_Plan.query.filter(Workout_Plan.id == id).first()
        response = make_response(
            workout_plan_schema.dump(workout_plan),
            200
        )
        return response
    
    def patch(self, id):
        # get record from db + json data + childrens
        workout_plan = Workout_Plan.query.filter(Workout_Plan.id == id).first()
        wp_data = request.get_json()
        exercise_moves = wp_data["exercise_moves"]
        exercise_moves = [Exercise_Move.query.filter(Exercise_Move.id == exercise_move["id"]).first() for exercise_move in exercise_moves]
        
        # delete data and attr that can cause issues when creating new record
        del wp_data["exercise_moves"]
        workout_plan.exercise_moves.clear()

        try:
            [setattr(workout_plan, attr, wp_data[attr]) for attr in wp_data]
            [workout_plan.exercise_moves.append(exercise_move) for exercise_move in exercise_moves]

            # commit into the DB
            db.session.add(workout_plan)
            db.session.commit()
        
        except Exception as e:
            error_message = str(e)
            return {"errors" :  error_message }, 400        


        response = make_response(
            workout_plan_schema.dump(workout_plan),
            200
        )

        return response


#######################
# /exercise_moves

class ExerciseMovesIndex(Resource):
    def get(self):
        exercise_moves = Exercise_Move.query.all()
        response = make_response(
            exercise_moves_schema.dump(exercise_moves),
            200
        )
        return response
    
    def post(self):
        em_data = request.get_json()
        del em_data["id"]

        # for patching and posting, i need
        #   try / except when creating or setting the object
        try: 
            new_exercise_move = Exercise_Move(**em_data)
            db.session.add(new_exercise_move)
            db.session.commit()
        except Exception as e:
            error_message = str(e)
            return {"errors" :  error_message }, 400

        response = make_response(
            exercise_move_schema.dump(new_exercise_move),
            201
        )

        return response


#######################
# /exercise_moves/id

class ExerciseMovesByID(Resource):
    def get(self, id):
        exercise_move = Exercise_Move.query.filter(Exercise_Move.id == id).first()
        response = make_response(
            exercise_move_schema.dump(exercise_move),
            200
        )
        return response
    
    
    def patch(self, id):

        ## this is prone to error if the record doesn't exist
        exercise_move = Exercise_Move.query.filter(Exercise_Move.id == id).first()

        # for patching and posting, i need
        #   try / except when creating or setting the object
        try:
            [setattr(exercise_move, attr, request.json.get(attr)) for attr in request.json]

        except Exception as e:
            error_message = str(e)
            return {"errors" :  error_message }, 400        

        db.session.add(exercise_move)
        db.session.commit()

        response = make_response(
            exercise_move_schema.dump(exercise_move),
            200
        )
        return response

#######################
# error handling

@app.errorhandler(InternalServerError)
def code_500(error):
    print("this worked!")
    print(error)
    response = make_response(error, 500)

    return response

#######################
# resources

api.add_resource(CoachesIndex,"/coaches")
api.add_resource(CoachesByID,"/coaches/<int:id>")

api.add_resource(ScheduledClassesIndex, "/schedules")
api.add_resource(ScheduledClassesByID, "/schedules/<int:id>")

api.add_resource(WorkoutPlansIndex, "/workout_plans", endpoint="workout_plans")
api.add_resource(WorkoutPlansByID, "/workout_plans/<int:id>")

api.add_resource(ExerciseMovesIndex, "/exercise_moves")
api.add_resource(ExerciseMovesByID, "/exercise_moves/<int:id>")

api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")

api.add_resource(CheckSession, "/checkSession")
api.add_resource(ClearSession, "/clearSession")

app.register_error_handler(400, code_500)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

