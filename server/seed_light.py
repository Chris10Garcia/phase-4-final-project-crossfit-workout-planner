#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from faker import Faker

from app import app
from models import db, Coach, Crossfit_Class, Exercise_Move, Workout_Plan, Schedule

def delete_all_records():
    print("Deleting all records...")
    Coach.query.delete()
    Crossfit_Class.query.delete()
    Exercise_Move.query.delete()
    Workout_Plan.query.delete()
    Schedule.query.delete()



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
            name = "Beginner Routine",
            difficulty = "Beginner",
            description = "An entry level class to teach you the basics"
        )

        coaches = [coach_rose, coach_dan]
        moves = [bench_press, dead_lift, burpee, clean, snatch, running]
        plans = [leg_burner, beginner]
        

        db.session.add_all(coaches + moves + plans)
        db.session.commit()

        print("Coach, workout plan, and exercise move records added to db")


        # leg_burner.exercise_moves.append(dead_lift)
        # leg_burner.exercise_moves.append(bench_press)
        # leg_burner.exercise_moves.append(running)
        # for xfit_class in leg_burner.crossfit_classes:
        #     # xfit_class.day = "Sunday"
        #     xfit_class.coach = coach_dan
        # db.session.add(leg_burner)
        # db.session.commit()

        # mondays = [Schedule(day = "Monday", coach=rc(coaches)) for i in range(0,5)]
        # tuesdays = [Schedule(day = "Tuesday", coach=rc(coaches)) for i in range(0,6)]
        # wednesday = [Schedule(day = "Wednesday", coach=rc(coaches)) for i in range(0,7)]

        mondays = [Schedule(day = "Monday", hour = i * 100, coach=rc(coaches), workout_plan = rc(plans) ) for i in range(9,14)]
        tuesdays = [Schedule(day = "Tuesday", hour = i * 100, coach=rc(coaches), workout_plan = rc(plans)  ) for i in range(9,14)]
        wednesday = [Schedule(day = "Wednesday", hour = i * 100, coach=rc(coaches), workout_plan = rc(plans)  ) for i in range(9,14)]
        mondays + tuesdays + wednesday

        db.session.add_all(mondays + tuesdays + wednesday)
        db.session.commit()

        monday = mondays[0]
        tuesday = tuesdays[2]

        # beginner.exercise_moves.append((burpee,))
        # beginner.exercise_moves.append((dead_lift,))   
        # print(beginner.exercise_moves[0])
        # beginner.exercise_moves.append((burpee, monday))
        # beginner.exercise_moves.append((dead_lift, monday))
        # beginner.exercise_moves.append((clean, monday))

        # beginner.exercise_moves.append((dead_lift, mondays[1]))
        # beginner.exercise_moves.append((dead_lift, mondays[1]))
        # beginner.exercise_moves.append((dead_lift, mondays[1]))

        # for test in beginner.crossfit_classes:
        #     test.schedule = monday
        # beginner.schedules.append(monday)
        # db.session.add(beginner)
        # db.session.commit()

        # mondays[1].workout_plans.append(beginner)
        leg_burner.exercise_moves.extend([dead_lift, clean, snatch])
        beginner.exercise_moves.append(clean)
        beginner.exercise_moves.append(running)
        beginner.exercise_moves.append(burpee)
        # for test in beginner.crossfit_classes:
        #     test.schedule = monday
        # beginner.schedules.append(monday)



        db.session.add_all([beginner, leg_burner])
        db.session.commit()

        # print(beginner.exercise_moves)

        # for day in mondays:
        #     day.workout_plans.append(beginner)
        #     day.workout_plans.append(leg_burner)
        # # monday.workout_plan = beginner
        # monday.workout_plan=beginner
        # db.session.add_all(mondays)
        # db.session.commit()

        # print(coach_dan.schedules)
        
        # print()

        


        # test_1 = Crossfit_Class(
        #     schedule = monday,
        #     workout_plan = beginner,
        #     exercise_move = running
        # )

        # test_2 = Crossfit_Class(
        #     schedule = monday,
        #     workout_plan = beginner,
        #     exercise_move = burpee
        # )

        # test_3 = Crossfit_Class(
        #     schedule = monday,
        #     workout_plan = beginner,
        #     exercise_move = clean
        # )

        # db.session.add_all([test_1, test_2, test_3])
        # db.session.commit()

        # print(beginner.schedules)
        # print(monday.crossfit_classes)
        # beginner.exercise_moves.append(clean)
        # beginner.exercise_moves.append(burpee)
        # beginner.exercise_moves.append(running)
        # beginner.schedules.append(monday)
        # for xfit_class in beginner.crossfit_classes:
        #     xfit_class.coach = coach_dan


        
        # beginner.schedules.append(mondays[0])

        # db.session.add(beginner)
        # db.session.commit()

        # monday = mondays[0]
        # monday.workout_plans.append(beginner)
        # db.session.add(monday)
        # db.session.commit()

        # leg_burner.exercise_moves.append(dead_lift)
        # leg_burner.exercise_moves.append(bench_press)
        # leg_burner.exercise_moves.append(running)
        # for xfit_class in leg_burner.crossfit_classes:
        #     xfit_class.coach = coach_rose
        #     if not xfit_class.day:
        #         xfit_class.day = "Monday"
        #         xfit_class.coach = coach_rose
        # db.session.add(leg_burner)
        # db.session.commit()


        # print(coach_rose.workout_plans)

        
        # print(leg_burner.crossfit_classes)
        # leg_burner.crossfit_classes.append(class_1_sunday)
        # leg_burner.exercise_moves.append(dead_lift)
        
        # leg_burner.exercise_moves.append(clean)
        # leg_burner.exercise_moves.append(running)
        # db.session.add(leg_burner)
        # db.session.commit()