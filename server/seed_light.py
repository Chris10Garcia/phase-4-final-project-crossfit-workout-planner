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



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed script...")
        delete_all_records()

        coach_dan = Coach(
            name = "Dan Baily",
            age = 30,
            picture = "https://www.themodestman.com/wp-content/uploads/2020/03/Dan-Bailey-CrossFit.jpg",
        )

        coach_rose = Coach(
            name = "Rose Smith",
            age = 25,
            picture = "https://misfitathletics.com/wp-content/uploads/2021/03/20200801-TED03193.cjpg_-819x1024.jpg"
        )

        bench_press = Exercise_Move(
            name = "Bench Press",
            focus = "Strength",
            description = "It involves lying on a bench and pressing weight upward using either a barbell or a pair of dumbbells. During a bench press, you lower the weight down to chest level and then press upwards while extending your arms. This movement is considered one repetition, or rep.",
            video_link = "https://www.youtube.com/watch?v=SCVCLChPQFY"
        )

        dead_lift = Exercise_Move(
            name = "Dead Lift",
            focus = "Strength",
            description = "The deadlift exercise is a relatively simple exercise to perform, a weight is lifted from a resting position on the floor to an upright position. The deadlift exercise utilizes multiple muscle groups to perform but has been used to strength the hips, thighs, and back musculature.",
            video_link = "youtube.com/watch?v=op9kVnSso6Q"
        )

        burpee = Exercise_Move(
            name = "Burpee",
            focus = "Cardio",
            description = "a conditioning exercise in which a person squats, places the palms of the hands on the floor in front of the feet, jumps back into a push-up position, in some cases completes one push-up, returns to the squat position, and then jumps up into the air while extending the arms overhead.",
            video_link = "https://www.youtube.com/watch?v=auBLPXO8Fww"
        )

        clean = Exercise_Move(
            name = "Clean",
            focus = "Olympic Weight Lifting",
            description = "when a barbell is “pulled in a single movement from the platform to the shoulders, while either splitting or bending the legs.” Simply put, a clean is a lift that moves a barbell from the floor to a front rack position at the shoulders.",
            video_link = "https://www.youtube.com/watch?v=EKRiW9Yt3Ps"
        )

        snatch = Exercise_Move(
            name = "Snatch",
            focus = "Olympic Weight Lifting",
            description = "In the snatch, the lifter lifts the bar as high as possible and pulls themselves under it in a squat position, receiving the bar overhead with the arms straight, decreasing the necessary height of the bar, therefore increasing the amount of weight that the lifter may successfully lift. The lifter finally straightens to a fully upright position with the bar above their head and arms fully extended.",
            video_link = "https://www.youtube.com/watch?v=9xQp2sldyts"
        )

        running = Exercise_Move(
            name = "Run",
            focus = "Cardio",
            description = "Running is the action of rapidly propelling yourself forward on foot. When running, there is a moment when both feet are off the ground (as opposed to walking, when one foot is always on the ground), making it a high-impact exercise",
            video_link = "https://www.youtube.com/watch?v=_kGESn8ArrU"
        )


        leg_burner = Workout_Plan(
            name = "Leg Burner",
            difficulty = "medium",
            description = "Leg focused workout that will help you increase size and strength"
        )

        beginner = Workout_Plan(
            name = "Beginner Crossfit Class",
            difficulty = "Beginner",
            description = "An entry level class to teach you the basics"
        )

        coaches = [coach_rose, coach_dan]
        moves = [bench_press, dead_lift, burpee, clean, snatch, running]
        plans = [leg_burner, beginner]
        db.session.add_all(coaches + moves + plans)
        db.session.commit()

        print("Records added to db")
