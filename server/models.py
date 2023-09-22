# NEED TO REMOVE THIS
# from sqlalchemy_serializer import SerializerMixin

# install / check if validates is in

from sqlalchemy.ext.associationproxy import association_proxy

from config import db




class Exercise_Move(db.Model):
    __tablename__ = "exercise_moves"

    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    focus = db.Column(db.String)
    description = db.Column(db.String)
    video_link = db.Column(db.String)

    # change this to back_populates to make easier to keep track?
    crossfit_classes = db.relationship("Crossfit_Class", backref="exercise_move")
    # workout_plans = association_proxy("crossfit_classes", "workout_plan",
    #                                 creator= lambda wp : Crossfit_Class(workout_plan = wp)
    #                                 )
    
    def __repr__(self):
        return f"<Exercise Move: {self.name}, ID: {self.id}>"

    # relationship
    """
    # many exercise move to many workout plans
    workout_plans = association proxy
    """

    # DB data validation
    """
    # DONT FORGET THIS IS A TUPLE, NEEDS THE COMA AT THE END  
    __table_args__ = (db.CheckConstraint()  ,)
    """

    # ORM data validation
    """
    @validates(column_1)
        def function_that_checks_column1_name(self, key, address)
            if condition_1_against_address
                raise error
            if condition_1_against_address
                raise error
            return address
    
    @validates(column_2)
        def function_that_checks_column2_name(self, key, address)
            if condition_1_against_address
                raise error
            if condition_1_against_address
                raise error
            return address
    """


class Coach(db.Model):
    __tablename__ = 'coaches'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    picture = db.Column(db.String) #URL at first. Should this be a blob / binary data for actual pictures?
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # schedules = db.relationship("Schedule", backref="coach")

    # testing this feature out
    # workout_plans = association_proxy("crossfit_classes", "workout_plan",
    #                                 creator= lambda wp : Crossfit_Class(workout_plan = wp)
    #                                 )
    
    def __repr__(self):
        return f"<Coach: {self.name}, ID: {self.id}>"

    # columns for authentication (add later)
    """
    username
    _password_hash
    """

    # DB data validation
    """
    # DONT FORGET THIS IS A TUPLE, NEEDS THE COMA AT THE END  
    __table_args__ = (db.CheckConstraint()  ,)
    """

    # Authentication
    """
    # protect password property
    @hybrid_property
    def password_hash

    # set password property
    @password_hash.setter
    def password_hash
        need to use bcrypt

    # check password
    def authenticate

    """

    # ORM data validation
    """
    @validates(column_1)
        def function_that_checks_column1_name(self, key, address)
            if condition_1_against_address
                raise error
            if condition_1_against_address
                raise error
            return address
    
    @validates(column_2)
        def function_that_checks_column2_name(self, key, address)
            if condition_1_against_address
                raise error
            if condition_1_against_address
                raise error
            return address
    """


# def check_or_create_workout_plan(item):

#     test = Crossfit_Class(exercise_move= item)
#     return test

# def check_or_create_schedule(item):
#     # print(self)
#     test = Crossfit_Class(schedule = item)
#     return test
    

class Workout_Plan(db.Model):
    __tablename__ = "workout_plans"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    difficulty = db.Column(db.String)
    description = db.Column(db.String)

    crossfit_classes = db.relationship("Crossfit_Class", backref="workout_plan")

    # exercise_moves = association_proxy("crossfit_classes", "exercise_move",
    #                                 creator= check_or_create_workout_plan)
    
    exercise_moves = association_proxy("crossfit_classes", "exercise_move",
                                    creator = lambda data: Crossfit_Class(exercise_move = data)
                                    )
        
    ######### I HAVE THIS SET UP REQURING A LIST WITH 2 ARGUMENTS!!!!
    # exercise_moves = association_proxy("crossfit_classes", "exercise_move",
    #                                 creator= lambda data: Crossfit_Class(exercise_move = data[0], schedule=data[1])
    #                                 )
    # schedules = association_proxy("crossfit_classes", "schedule",
    #                                 creator= check_or_create_schedule
    #                                 )
    # coaches = association_proxy("crossfit_classes", "coach",
    #                                 creator= lambda co : Crossfit_Class(coach= co)
    #                                 )

    # relationship
    """
    # many workout plans to many exercise moves
    exercise_moves = association proxy
    """

    def __repr__(self):
        return f"<Workout Plan: {self.name}, ID: {self.id}>"

    # DB data validation
    """
    # DONT FORGET THIS IS A TUPLE, NEEDS THE COMMA AT THE END  
    __table_args__ = (db.CheckConstraint()  ,)
    """

    # ORM data validation
    """
    @validates(column_1)
        def function_that_checks_column1_name(self, key, address)
            if condition_1_against_address
                raise error
            if condition_1_against_address
                raise error
            return address
    
    @validates(column_2)
        def function_that_checks_column2_name(self, key, address)
            if condition_1_against_address
                raise error
            if condition_1_against_address
                raise error
            return address
    """

class Crossfit_Class(db.Model):
    __tablename__ = "crossfit_classes"

    id = db.Column(db.Integer, primary_key = True)
    
    # day = db.Column(db.String)

    exercise_move_id = db.Column(db.Integer, db.ForeignKey('exercise_moves.id'))
    workout_plan_id = db.Column(db.Integer, db.ForeignKey('workout_plans.id'))

    # schedule_id = db.Column(db.Integer, db.ForeignKey('schedules.id'))
    # coach = db.relationship('Coach', backref="crossfit_classes")
    # relationship
    """
    """

    #need to redo this when the other classes are available
    def __repr__(self):
        return f"<Crossfit Class Workout: {self.workout_plan.name}>"

    # DB data validation
    """
    # DONT FORGET THIS IS A TUPLE, NEEDS THE COMMA AT THE END  
    __table_args__ = (db.CheckConstraint()  ,)
    """

    # ORM data validation
    """
    @validates(column_1)
        def function_that_checks_column1_name(self, key, address)
            if condition_1_against_address
                raise error
            if condition_1_against_address
                raise error
            return address
    
    @validates(column_2)
        def function_that_checks_column2_name(self, key, address)
            if condition_1_against_address
                raise error
            if condition_1_against_address
                raise error
            return address
    """

    # repr
    """
    def __repr__
        <Class: Taught On self.Day>
        <Workout Plan: Name>
        <Exercise Move: Move Name>
    """  




##### WILL DECIDE AT THE END IF I WILL ADD EXTRA FEATURES


# class Schedule(db.Model):
#     __tablename__ = "schedules"

#     id = db.Column(db.Integer, primary_key = True)
#     day = db.Column(db.String)
#     coach_id = db.Column(db.Integer, db.ForeignKey("coaches.id"))

#     crossfit_classes = db.relationship("Crossfit_Class", backref="schedule")
#     workout_plans = association_proxy("crossfit_classes", "workout_plan",
#                                     creator= lambda wp : Crossfit_Class(workout_plan = wp)
#                                     )

#     def __repr__(self):
#         return f"Day: {self.day}"