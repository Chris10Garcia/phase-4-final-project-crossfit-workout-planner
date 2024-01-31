from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db, bcrypt


class Exercise_Move(db.Model):
    __tablename__ = "exercise_moves"

    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    focus = db.Column(db.String)
    description = db.Column(db.String)
    video_link = db.Column(db.String)

    # for all models i need to add validates like this 
    @validates("name")
    def check_name(self, key, address):
        if address == "" or address == None:
            raise Exception("Please input a name")
        return address

    @validates("focus")
    def check_focus(self, key, address):
        if address == "":
            raise Exception("Please input a focus")
        return address
    
    @validates("description")
    def check_description(self, key, address):
        if address == "" or address == None:
            raise Exception("Please input a description")
        return address

    @validates("video_link")
    def check_video_link(self, key, address):
        if address == "":
            raise Exception("Please input a video link")
        return address

    crossfit_classes = db.relationship("Crossfit_Class", back_populates="exercise_move", cascade = "all, delete-orphan")
    workout_plans = association_proxy("crossfit_classes", "workout_plan", creator = lambda data: Crossfit_Class(workout_plan = data) )
    def __repr__(self):
        return f"<Exercise Move: {self.name}, ID: {self.id}>"


class Coach(db.Model):
    __tablename__ = 'coaches'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    picture = db.Column(db.String)

    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    @validates("name")
    def check_name(self, key, address):
        if address == "":
            raise Exception("Please include a name")
        return address
    
    @validates("age")
    def check_age(self, key, address):
        if address == "":
            raise Exception("Please include an age")
        return address

    @validates("picture")
    def check_picture(self, key, address):
        if address == "":
            raise Exception("Please include a picture")
        return address

    schedules = db.relationship("Schedule", back_populates="coach")
    workout_plans = association_proxy("schedules", "workout_plan", )

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"<Coach: {self.name}, ID: {self.id}>"


class Workout_Plan(db.Model):
    __tablename__ = "workout_plans"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    difficulty = db.Column(db.String)
    description = db.Column(db.String)

    schedules = db.relationship("Schedule", back_populates = "workout_plan", )
    crossfit_classes = db.relationship("Crossfit_Class", back_populates="workout_plan", cascade = "all, delete-orphan")
    
    exercise_moves = association_proxy("crossfit_classes", "exercise_move", creator = lambda data: Crossfit_Class(exercise_move = data) )
    coaches = association_proxy("schedules", "coach",)

    @validates("name")
    def check_name(self, key, address):
        if address == "":
            raise Exception("Please include a name")
        return address
    
    @validates("difficulty")
    def check_difficulty(self, key, address):
        if address == "":
            raise Exception("Please include a difficulty")
        return address

    @validates("description")
    def check_description(self, key, address):
        if address == "" or address == None:
            raise Exception("Please input a description")
        return address

    def __repr__(self):
        return f"<Workout Plan: {self.name}, ID: {self.id}>"
    

class Crossfit_Class(db.Model):
    __tablename__ = "crossfit_classes"

    id = db.Column(db.Integer, primary_key = True)

    exercise_move_id = db.Column(db.Integer, db.ForeignKey('exercise_moves.id'))
    workout_plan_id = db.Column(db.Integer, db.ForeignKey('workout_plans.id'))

    exercise_move = db.relationship("Exercise_Move", back_populates="crossfit_classes")
    workout_plan = db.relationship("Workout_Plan", back_populates="crossfit_classes")

    def __repr__(self):
        return f"<Crossfit Class Workout: {self.id}, Move ID: {self.exercise_move_id}, Workout Plan ID: {self.workout_plan_id}>"


class Schedule(db.Model):
    __tablename__ = "schedules"

    id = db.Column(db.Integer, primary_key = True)
    day = db.Column(db.String)
    hour = db.Column(db.String)
    coach_id = db.Column(db.Integer, db.ForeignKey("coaches.id"))
    workout_plan_id = db.Column(db.Integer, db.ForeignKey("workout_plans.id"))
    
    coach = db.relationship("Coach", back_populates="schedules",)
    workout_plan = db.relationship("Workout_Plan", back_populates="schedules",)
    
    @validates("day")
    def check_day(self, key, address):
        if address == "":
            raise Exception("Please include a day")
        return address

    @validates("hour")
    def check_hour(self, key, address):
        if address == "":
            raise Exception("Please include an hour")
        return address

    def __repr__(self):
        return f"Day: {self.day}, Hour: {self.hour}"
    

