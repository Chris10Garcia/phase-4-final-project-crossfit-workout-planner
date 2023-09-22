#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
# from marshmallow_sqlalchemy import fields
from marshmallow import fields

# Local imports
from config import app, db, api, ma
from models import Coach, Crossfit_Class, Workout_Plan, Exercise_Move
# Add your model imports


# Views go here!

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'

class Exercise_Move_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Exercise_Move
        load_instance = True

class Workout_Plan_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Workout_Plan
        load_instance = True
    exercise_moves = fields.List(fields.Nested(Exercise_Move_Schema))


exercise_move_schema = Exercise_Move_Schema()
exercise_move_schema_many = Exercise_Move_Schema(many=True)

workout_plan_schema = Workout_Plan_Schema()
workout_plan_schema_many = Workout_Plan_Schema(many=True)


class Workout_Plan_Index(Resource):
    def get(self):
        workout_plans = Workout_Plan.query.all()
        response = make_response(
            workout_plan_schema_many.dump(workout_plans),
            200
        )
        return response


api.add_resource(Workout_Plan_Index, "/workout_plans", endpoint="workout_plans")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

