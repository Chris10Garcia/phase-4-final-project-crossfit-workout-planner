#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
# from marshmallow_sqlalchemy import fields
from marshmallow import fields
# Local imports
from config import app, db, api, ma
from models import Coach, Crossfit_Class, Workout_Plan, Exercise_Move, Schedule
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


# Schema plans

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



coach_schema = Coach_Schema()
coaches_schema = Coach_Schema(many=True)

schedule_schema = Schedule_Schema()
schedules_schema = Schedule_Schema(many = True)

exercise_move_schema = Exercise_Move_Schema()
exercise_moves_schema = Exercise_Move_Schema(many=True)

workout_plan_schema = Workout_Plan_Schema()
workout_plans_schema = Workout_Plan_Schema(many=True)


class CoachesIndex(Resource):
    def get(self):
        coaches = Coach.query.all()
        response = make_response(
            coaches_schema.dump(coaches),
            200
        )
        return response

class CoachesByID(Resource):
    def get(self, id):
        coach = Coach.query.filter(Coach.id == id).first()
        response = make_response(
            coach_schema.dump(coach),
            200
        )
        return response
    

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

        new_schedule = Schedule(**sch_data)

        new_schedule.coach = Coach.query.filter(Coach.id == coach_data["id"]).first()
        new_schedule.workout_plan = Workout_Plan.query.filter(Workout_Plan.id == workout_plan_data["id"]).first()

        db.session.add(new_schedule)
        db.session.commit()

        response = make_response(
            schedule_schema.dump(new_schedule),
            201
        )

        return response
    
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

        [setattr(scheduledclass, attr, sch_data[attr]) for attr in sch_data]

        scheduledclass.workout_plan = Workout_Plan.query.filter(Workout_Plan.id == workout_plan_data["id"]).first()
        scheduledclass.coach = Coach.query.filter(Coach.id == coach_data["id"]).first()

        db.session.add(scheduledclass)
        db.session.commit()

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
        
        new_workout_plan = Workout_Plan(**wp_data)

        # Need to pull the object. Can't just use the ID number
        exercise_moves = [Exercise_Move.query.filter(Exercise_Move.id == exercise_move["id"]).first() for exercise_move in exercise_moves]
        [new_workout_plan.exercise_moves.append(exercise_move) for exercise_move in exercise_moves]

        db.session.add(new_workout_plan)
        db.session.commit()

        response = make_response(
            workout_plan_schema.dump(new_workout_plan),
            201
        )

        return response


class WorkoutPlansByID(Resource):
    def get(self, id):
        workout_plan = Workout_Plan.query.filter(Workout_Plan.id == id).first()
        response = make_response(
            workout_plan_schema.dump(workout_plan),
            200
        )
        return response
    
    def patch(self, id):
        # get record from db + json data + children
        workout_plan = Workout_Plan.query.filter(Workout_Plan.id == id).first()
        wp_data = request.get_json()
        exercise_moves = wp_data["exercise_moves"]
        exercise_moves = [Exercise_Move.query.filter(Exercise_Move.id == exercise_move["id"]).first() for exercise_move in exercise_moves]
        
        # delete data and attr that can cause issues
        del wp_data["exercise_moves"]
        workout_plan.exercise_moves.clear()

        # update records + update children
        [setattr(workout_plan, attr, wp_data[attr]) for attr in wp_data]
        [workout_plan.exercise_moves.append(exercise_move) for exercise_move in exercise_moves]

        # commit into the DB
        db.session.add(workout_plan)
        db.session.commit()

        response = make_response(
            workout_plan_schema.dump(workout_plan),
            200
        )

        return response

    
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
        
        new_exercise_move = Exercise_Move(**em_data)

        db.session.add(new_exercise_move)
        db.session.commit()

        response = make_response(
            exercise_move_schema.dump(new_exercise_move),
            201
        )

        return response

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
        [setattr(exercise_move, attr, request.json.get(attr)) for attr in request.json]
        db.session.add(exercise_move)
        db.session.commit()

        response = make_response(
            exercise_move_schema.dump(exercise_move),
            200
        )
        return response
    



api.add_resource(CoachesIndex,"/coaches")
api.add_resource(CoachesByID,"/coaches/<int:id>")

api.add_resource(ScheduledClassesIndex, "/schedules")
api.add_resource(ScheduledClassesByID, "/schedules/<int:id>")

api.add_resource(WorkoutPlansIndex, "/workout_plans", endpoint="workout_plans")
api.add_resource(WorkoutPlansByID, "/workout_plans/<int:id>")

api.add_resource(ExerciseMovesIndex, "/exercise_moves")
api.add_resource(ExerciseMovesByID, "/exercise_moves/<int:id>")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

