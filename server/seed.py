#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Coach, Crossfit_Class, Exercise_Move, Workout_Plan

def delete_all_records():
    print("Deleting all records...")
    Coach.query.delete()
    Crossfit_Class.query.delete()
    Exercise_Move.query.delete()
    Workout_Plan.query.delete()
    db.session.commit() #is this necessary?


# basic for now, maybe later on create records that are more accurate to fitness and crossfit?
"""
def create Exercise_Move records

    Exercise_Move attributes to fill in
    
    name = db.Column(db.String)         ---->> Can be faker.name
    focus = db.Column(db.String)        ---->> Random choice of "mobility", "strength", "cardio", "gymnastics", "olypmic weight-lifting"
    description = db.Column(db.String)  ---->> Can be faker generation of text
    video_link = db.Column(db.String)   ---->> Hard to make random, might need an array of youtube video links
"""

"""
def create Coach records

    Coach attributes to fill in
    
    name = db.Column(db.String)         ---->> Can be faker.name
    age = db.Column(db.Integer)         ---->> Can be random number
    picture = db.Column(db.String)      ---->> Random choice of crossfit coach pictures online

    # DEAL WITH THIS LATER
    # Attributes for password stuff
    username                            ---->> Can this be a faker thing? maybe name but lowercase, no spaces + age
    _password_hash                      ---->> hash_password_generattor (username + password)
"""

"""
def create Workout_plan records

    Workout_Plan attributes to fill in
    
    name = db.Column(db.String)         ---->> Can be faker.name
    difficulty = db.Column(db.String)   ---->> Rnadom choice of beginner, easy, medium, hard, expert, professional
    description = db.Column(db.String)  ---->> Can be faker generation of text
"""

"""
def create Crossfit_class

    Crossfit_Class attributes to fill in

    day = db.Column(db.String)          ---->> Random choice of Sunday - Saturday

"""


"""
def relate records
"""


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed script...")

        delete_all_records()



