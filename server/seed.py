#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker

from app import app
from models import db, Coach, Crossfit_Class, Exercise_Move, Workout_Plan, Schedule

fake = Faker()


def delete_all_records():
    "DELETE ALL RECORDS WITHIN DB"

    print("Deleting all records...")

    Schedule.query.delete()
    Crossfit_Class.query.delete()
    Coach.query.delete()
    Exercise_Move.query.delete()
    Workout_Plan.query.delete()




def create_coaches():
    "CREATE ALL COACH RECORDS WITHIN DB"

    print("Creating new Coach records...")

    coach_dan = Coach(
            name = "Dan Baily",
            age = 30,
            picture = "https://www.themodestman.com/wp-content/uploads/2020/03/Dan-Bailey-CrossFit.jpg",
            username = "danbaily"
        )

    coach_rose = Coach(
            name = "Rose Smith",
            age = 25,
            picture = "https://misfitathletics.com/wp-content/uploads/2021/03/20200801-TED03193.cjpg_-819x1024.jpg",
            username = "rosesmith"
        )

    coach_brent = Coach(
            name = "Brent Fikowski",
            age = 40,
            picture = "https://upload.wikimedia.org/wikipedia/commons/5/5d/Brent_Fikowski_at_the_Asia_CrossFit_Championship.jpg",
            username = "brentfikowski"
    )

    coach_chris = Coach(
            name = "Chris Garcia",
            age = 33,
            picture = "https://avatars.githubusercontent.com/u/10578405?v=4",
            username = "chrisgarcia"
        )
    
    coaches = [ coach_chris, coach_brent, coach_dan, coach_rose, ]

    for coach in coaches:
        coach.password_hash = coach.username + "_password"

    add_records(coaches)

    return coaches

def create_exercise_moves():
    "CREATE ALL EXERCISE MOVE RECORDS WITHIN DB"

    print("Creating new Exercise Move records...")

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

    moves = [bench_press, dead_lift, burpee, clean, snatch, running ]

    add_records(moves)

    return moves



def create_workout_plans():
    "CREATE ALL WORKOUT PLAN RECORDS WITHIN DB"

    print("Creating new Workout Plan records...")

    leg_burner = Workout_Plan(
        name = "Leg Burner",
        difficulty = "Medium",
        description = "Leg focused workout that will help you increase size and strength"
    )

    beginner = Workout_Plan(
        name = "Beginner Routine",
        difficulty = "Beginner",
        description = "An entry level class to teach you the basics"
    )

    advance_class = Workout_Plan(
        name = "Advance Workout Class",
        difficulty = "Hard",
        description = "A workout plan that uses advanced moves and tests the limits of your strength"

    )

    plans = [leg_burner, beginner, advance_class]

    add_records(plans)

    return plans


def create_schedule():
    "CREATE ALL SCHEDULE RECORDS WITHIN DB"

    print("Creating new Schedule records...")

    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    schedules = [ [ Schedule( day = day, hour = i * 100 ) for i in range(9,15) ] for day in days]    
    
    [ add_records(days) for days in schedules ]
    
    return schedules

def relate_workout_plans_and_moves(workout_plan, moves):
    "RELATE EXERCISE MOVES WITH A WORKOUT PLAN"

    workout_plan.exercise_moves.extend(moves)
    add_record(workout_plan)


def relate_schedule_with_coaches_and_plans(days, coaches, plans):
    "RELATE COACH AND WORKOUT PLAN WITH A SCHEDULE"
    
    for day in days:
        day.coach = rc(coaches)
        day.workout_plan = rc(plans)
    
    add_records(days)
    

def add_records(arry_of_records):
    "ADD AN ARRAY OF RECORDS INTO DB"

    db.session.add_all(arry_of_records)
    db.session.commit()

def add_record(record):
    "ADD A SINGLE RECORD INTO DB"

    db.session.add(record)
    db.session.commit()



if __name__ == '__main__':
    with app.app_context():
        print("Starting seed script...")

        delete_all_records()
        
        coaches = create_coaches()
        
        moves = create_exercise_moves()
        plans = create_workout_plans()

        print("Coach, workout plan, and exercise move records added to db")

        [ coach_chris, coach_brent, coach_dan, coach_rose ] = coaches
        [ bench_press, dead_lift, burpee, clean, snatch, running ] = moves
        [ leg_burner, beginner, advance_class ] = plans

        print("Relating Exercise Move records with a Workout Plan records...")

        relate_workout_plans_and_moves(leg_burner, [dead_lift, clean, snatch] )
        relate_workout_plans_and_moves(beginner, [clean, running, burpee])
        relate_workout_plans_and_moves(advance_class, [clean, dead_lift, snatch, running, burpee])

        print("Relationship complete")

        schedules = create_schedule()

        print("Relating a Coach and Workout Plan record with a Schedule record...")

        [relate_schedule_with_coaches_and_plans(days, coaches, plans) for days in schedules]

        print("DB record creation and relationships complete")






""" 
    THE BELOW COMMENTED OUT CODE WAS CODE USED TO BRAINSTORM AND UNDERSTAND HOW DBS WORK
    KEEPING THIS AS A MEMORY IN TERMS OF HOW I TROUBLESHOOTED THINGS, MENTAL THOUGHT
    PROCESS, ETC. THE BELOW IS NOT TO BE UNCOMMENTED OUT AS IT MIGHT NOT FUNCTION 
    ANY LONGER.
"""

        # [add_records(days) for days in schedules]

        # days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        # schedules = [ 
        #     [Schedule( day = day, hour = i * 100, coach=rc(coaches), workout_plan = rc(plans) ) for i in range(9,15)] for day in days
        #         ]    

        # # [mondays, tuesdays, wednesdays, thursdays, fridays, saturdays] = schedules

        # mondays = [Schedule(day = "Monday", hour = i * 100, coach=rc(coaches), workout_plan = rc(plans) ) for i in range(9,15)]
        # tuesdays = [Schedule(day = "Tuesday", hour = i * 100, coach=rc(coaches), workout_plan = rc(plans)  ) for i in range(9,14)]
        # wednesdays = [Schedule(day = "Wednesday", hour = i * 100, coach=rc(coaches), workout_plan = rc(plans)  ) for i in range(9,14)]

        # db.session.add_all(mondays + tuesdays + wednesdays)

        # db.session.commit()
        # days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        # schedules = [ 
        #     [Schedule( day = day, hour = i * 100, coach=rc(coaches), workout_plan = rc(plans) ) for i in range(9,15)] for day in days
        #             ]


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

        # mondays = [Schedule(day = "Monday", hour = i * 100, coach=rc(coaches), workout_plan = rc(plans) ) for i in range(9,15)]
        # tuesdays = [Schedule(day = "Tuesday", hour = i * 100, coach=rc(coaches), workout_plan = rc(plans)  ) for i in range(9,14)]
        # wednesday = [Schedule(day = "Wednesday", hour = i * 100, coach=rc(coaches), workout_plan = rc(plans)  ) for i in range(9,14)]

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

        # for test in beginner.crossfit_classes:
        #     test.schedule = monday
        # beginner.schedules.append(monday)


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