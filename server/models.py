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

    crossfit_classes = db.relationship("Crossfit_Class", backref="exercise_move")
    
    def __repr__(self):
        return f"<Exercise Move: {self.name}, ID: {self.id}>"


class Coach(db.Model):
    __tablename__ = 'coaches'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    picture = db.Column(db.String)

    schedules = db.relationship("Schedule", back_populates="coach")

    def __repr__(self):
        return f"<Coach: {self.name}, ID: {self.id}>"


class Workout_Plan(db.Model):
    __tablename__ = "workout_plans"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    difficulty = db.Column(db.String)
    description = db.Column(db.String)

    schedules = db.relationship("Schedule", back_populates = "workout_plan")
    crossfit_classes = db.relationship("Crossfit_Class", backref="workout_plan")
    
    exercise_moves = association_proxy("crossfit_classes", "exercise_move", creator = lambda data: Crossfit_Class(exercise_move = data) )

    def __repr__(self):
        return f"<Workout Plan: {self.name}, ID: {self.id}>"
    

class Crossfit_Class(db.Model):
    __tablename__ = "crossfit_classes"

    id = db.Column(db.Integer, primary_key = True)

    exercise_move_id = db.Column(db.Integer, db.ForeignKey('exercise_moves.id'))
    workout_plan_id = db.Column(db.Integer, db.ForeignKey('workout_plans.id'))

    def __repr__(self):
        return f"<Crossfit Class Workout: {self.id}, Move ID: {self.exercise_move_id}, Workout Plan ID: {self.workout_plan_id}>"


class Schedule(db.Model):
    __tablename__ = "schedules"

    id = db.Column(db.Integer, primary_key = True)
    day = db.Column(db.String)
    hour = db.Column(db.String)
    coach_id = db.Column(db.Integer, db.ForeignKey("coaches.id"))
    workout_plan_id = db.Column(db.Integer, db.ForeignKey("workout_plans.id"))
    
    coach = db.relationship("Coach", back_populates="schedules")
    workout_plan = db.relationship("Workout_Plan", back_populates="schedules")
    
    def __repr__(self):
        return f"Day: {self.day}, Hour: {self.hour}"
    

