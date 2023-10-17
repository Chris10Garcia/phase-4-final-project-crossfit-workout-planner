# Phase 4 Project: Flatiron Crossfit



## Table of Content

1. [Overview](#overview)
2. [Get Started](#get-started)
3. [Detailed Project Info](#detailed-project-info)
4. [Backend Details](#backend-details)
    1. [app.py](#apppy)
    2. [models.py](#modelspy)
    3. [seed.py](#seedpy)
    4. [config.py](#configpy)
5. [Frontend Details](#frontend-details)
    1. [App and Header Components](#app-and-header-components)
    2. [PageFrame and ListData Components](#pageframe-and-listdata-components)
    3. [Coach, ExerciseMove, WorkoutPlan, ClassSchedule Components](#coach-exercisemove-workoutplan-classschedule-components)
    4. [CoachForm, ExerciseMoveForm, WorkoutPlanForm, ClassScheduleForm Components](#coachform-exercisemoveform-workoutplanform-classscheduleform-components)
    5. [CoachDetails, ExerciseMoveDetails, WorkoutPlanDetails, ClassScheduleDetails Components](#coachdetails-exercisemovedetails-workoutplandetails-classscheduledetails-components)
6. [Sources and Credit](#sources-and-credit)


## Overview

Welcome to my phase 4 final project: The Flatiron Crossfit Workout and Class viewer! This is meant to be a light version of the Wodify app, a gym and studio management software platform.

With this app you can:
- create, edit, and view various exercise moves and develop workout plans that use these moves.
- create, edit, and view coaches
- create, edit, view and delete scheduling of crossfit classes; assign who teaches them, which workout plan they will use, and schedule the day and time that class occurs.


## Get Started

Please note, Pipenv is required. See [here](https://pipenv.pypa.io/en/latest/installation/) for installing pipenv. My project utilizes python_version = "3.8.13".

- Clone this repo
- `cd` into the folder
- Run `pipenv install`
- If using Visual Studio Code and it ask if you would like to select the workspace folder for the newly created environment, select yes
- Run `pipenv shell`
- `cd` into the `server` folder
- Run `flask db upgrade`
- Run `python seed.py`
- Run `python app.py`
- Open another terminal (ensure you're within the parent folder of the repo)
- Run `npm install -prefix client`
- Run `npm start -prefix client`

Your browser should open to `http://localhost:3000/`. Explore around, provide feedback if you like, and thank you for visiting!

If you would like to know more about the specific details of how my application functions, please keep reading below.


## Detailed Project Info

My project is broken into two major parts:
1. the backend which covers the DB tables, the relationships between them, and the various API's and RESTful views.
2. the frontend which covers all of the various React components that visually make my application.

Below covers the details of each and the various important files that make it work.


## Backend Details

My project uses python as the backend language, Flask as the web framework, sqlite as the database, SQLAlchemy as the ORM, and marshmallow for object serialization.


### app.py

This is my flask application. There are 4 views it provides; `Coach`, `Workout_Plan`, `Exercise_Move`, and `Schedule`. It is broken down into 2 main substructures to handle this:
1. The API schema:
- Each of the schemas inherits from the `flask_marshmallow` library. To automate and make life easier, I utilize auto generate to automatically generate each of the columns of the tables.
- For the `Schedule` and `Workout_Plan` schema, I use the `fields` function from the `marshmallow` (and not from `flask_marshmallow`) library to load in the many-to-many relationship records. Additionally, only specific columns are loaded to prevent a circular recursion issue.
- For each of the schemas, 2 object versions are created to handle a singular or a list of object records to serialize.

2. RESTFUL API Routes:
- Each of the views inherits `Resources` from the `flask_restful` library.
- Each of the views have 2 versions: the base `/route` path and the `/route/id` path.
- This application follows RESTful conventions:
    - Base `/route` paths handle GET actions for all records and POST actions for creating single records
    - `/route/<id>` paths handle GET, PATCH, and DELETE actions for single records
- This application follows the project requirements: 
    - All tables / views have CREATE, READ actions plus EDIT as well
    - The `Schedule` table / view also has DELETE actions

IMPORTANT: Even though `Crossfit_Class` table is not explicitly provided a view, records in this table are created, read, and edited by association proxy established within the `Workout_Plan` and `Exercise_Move` model.


### models.py

[![Database Relationship Diagram](/github_assets/Workout_Planner_DB_diagram.png 'db diagram')](https://dbdiagram.io/d/Workout_Planner-6501f5fe02bd1c4a5e848a9c)

`Coach -> Schedule <- Workout_Plan -> Crossfit_Class <- Exercise_Move`

Here we have my application's database table models. There are 5 tables in use here:
- Three of those tables are 1-to-many tables (`Exercise_Move`, `Coach`, `Workout_Plan`)
- Two of those tables are many-to-many (`Crossfit_Class`, `Schedule`)
- `Coach` and `Workout_Plan` have a many-to-many relationship, using `Schedule` as the intermediary
- `Schedule` also has 2 user submittable attributes (`day` and `hour`)
- `Workout_Plan` and `Exercise_Move` have a many-to-many relationship using association proxy and `Crossfit_Class` as the intermediary


### seed.py

My seed file populates the database. It is broken down into the following steps
- delete all of the current records
- create all of the 1-to-many records first (`Exercise_Move`, `Coach`, `Workout_Plan`) and pass them to the function that adds it to the DB
- relate the `Exercise_Move` records to `Workout_Plan` records and pass them to the function that adds it to the DB
- create the `Schedule` records with two of the generated user submitted attributes and pass them to the function that adds it to the DB
- relate the `Schedule` records with randomly selected `Coach` and `Workout_Plan` records, and pass them to the function that adds it to the DB


### config.py

This file contains all of the library imports and instantiations of various apps and settings. A config file is utilized to prevent circular import issues. The following is performed:
- Creates the flask instance, links the database, and configures various settings
- Defines the metadata and creates a Flask SQLAlchemy extension
- Creates a flask migrate object to manage database schema migrations
- Initialize the flask app to use the database
- Instanizate REST API, marshmallow serializer, and CORS objects


## Frontend Details

My project uses React as the front-end framework. For styling and themes, I use React Semantic UI framework. For form inputs and validation, I use Formik forms and yup.


### App and Header Components

The root of my application is the App Component. Here I have routing to access the other components of my page. Additionally, the Header component lies here as well. Please note, the Blog component can be ignored, is not to be used for grade evaluation. I used this component to ensure the code I wrote for my blog functions as intended.


### PageFrame and ListData Components

To ensure consistent page appearance, I created a reusable PageFrame component that uses various semantic UI components. Two key important children it accepts are for displaying the form component, and displaying the details of that page component.

ListData is also a reusable component. It displays a list of all of the records it recieves and uses route match to push the selected record to the details page component. NavLink is utilized as well so that when the record is viewed, the link is selected.


### Coach, ExerciseMove, WorkoutPlan, ClassSchedule Components

Each of these 4 components are structured similarly to handle:
- specific attributes
- maintaining state of these attributes
- Ordering the form component first, and details component second

Even though formik does not require outside state variables, it is in use here to handle editing of exisiting records. 

Coach, ExerciseMove, and WorkoutPlan uses PageFrame and ListData components to standardize their styling. ClassSchedule has a similar structure but it does not use these two components


### CoachForm, ExerciseMoveForm, WorkoutPlanForm, ClassScheduleForm Components

Each of these form components:
- use formik forms and yup
- the same form can handle creating new records or editting an existing record
- performs fetch requests for PATCH or POST actions

For the WorkoutPlanForm component, I created logic that can handle adding or removing a dynamic list of field selection inputs. This is to ensure the user will be selecting from exercise moves that exist in the database and can add or adjust a variable number of moves to that specific plan

For the ClassSchedule component, the user submittable fields are selection inputs to ensure the data input is standardized.


### CoachDetails, ExerciseMoveDetails, WorkoutPlanDetails, ClassScheduleDetails Components

Each of these components
- displays the detail views of their pages

CoachDetails, ExerciseMoveDetails, and WorkoutPlanDetails utilizes useParams to ensure when a specific record is navigated to, it captures the ID number and displays the correct record.

ClassScheduleDetails displays all of the scheduled classes with their days, hours and the related coach plus workout plan record that belongs to it. Additionally, this component handles the deletion logic.


## Sources and Credit

Backend
- [Flask](https://flask.palletsprojects.com/en/3.0.x/)
- [Marshmallow](https://marshmallow.readthedocs.io/en/stable/)
- [Flask Marshmallow](https://flask-marshmallow.readthedocs.io/en/latest/)
- [Marshmallow SQLAchelmy](https://marshmallow-sqlalchemy.readthedocs.io/en/latest/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Draw Entity-Relationship Diagrams](https://dbdiagram.io/)

Frontend
- [React](https://react.dev/)
- [React Semantic UI](https://react.semantic-ui.com/)
- [Formik](https://formik.org/docs/overview)
- [Yup](https://github.com/jquense/yup)

Miscellaneous
- [Official Crossfit Youtube Channel](https://www.youtube.com/@crossfit)
- [Wodify](https://www.wodify.com/)
- [Crossfit Athletes](https://games.crossfit.com/athletes) 
