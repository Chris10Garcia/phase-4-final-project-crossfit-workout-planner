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

    def __repr__(self):
        return f"<Exercise Move: {self.name}, ID: {self.id}>"

    # relationship
    """
    # one exercise move to many classes
    classes = relationship backref= exercise_move

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

    def __repr__(self):
        return f"<Exercise Move: {self.name}, ID: {self.id}>"


class Coach(db.Model):
    __tablename__ = 'coaches'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    picture = db.Column(db.String) #URL at first. Should this be a blob / binary data for actual pictures?
    created_at = db.Column(db.DataTime, server_default=db.func.now())

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

    # relationship
    """
    # one coach to many classes
    classes = relationship backref = coach
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


class Workout_Plan(db.Model):
    __tablename__ = "workout_plans"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    difficulty = db.Column(db.String)
    description = db.Column(db.String)

    def __repr__(self):
        return f"<Workout Plan: {self.name}, ID: {self.id}>"

    # DB data validation
    """
    # DONT FORGET THIS IS A TUPLE, NEEDS THE COMMA AT THE END  
    __table_args__ = (db.CheckConstraint()  ,)
    """

    # relationship
    """
    # one workout plan to many classes
    classes = relationship backref = workout_plan

    # many workout plans to many exercise moves
    exercise_moves = association proxy
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
    day = db.Column(db.String)

    exercise_move_id = db.Column(db.Integer, db.ForeignKey('exercise_moves.id'))
    coach_id = db.Column(db.Integer, db.ForeignKey('coaches.id'))
    workout_plan_id = db.Column(db.Integer, db.ForeignKey('workout_plans.id'))

    # foreign columns
    """
    exercise_move_id
    coach_id
    workout_plan_id
    """

    # DB data validation
    """
    # DONT FORGET THIS IS A TUPLE, NEEDS THE COMMA AT THE END  
    __table_args__ = (db.CheckConstraint()  ,)
    """

    # relationship
    """
    # many crossfit classes to 
        one workout plan
    workout_plan = relationship back_populates workout_plans

        one coach
    coach = relatinoship back_populates coaches

        one exercise
    exercise_move = relationship back_populates exercise_moves

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