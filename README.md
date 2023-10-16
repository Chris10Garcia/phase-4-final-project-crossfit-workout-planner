# Phase 4 Project: Flatiron Crossfit


## Table of Content

1. [Overview](#overview)
2. [Get Started](#get-started)
3. [Detailed Project Info](#detailed-project-info)
4. [Backend Details](#backend-details)
.. 1. [App](#apppy)
.. 2. [Models](#modelspy)
.. 3. [Config](#configpy)
.. 4. [Seed](#seedpy)
5. [Frontend Details]
.. 1. [Hierachy Structure]
.. 2. [App and Header]
.. 3. [PageFrame and ListData Components]
.. 3. [Coach Components]
.. 4. [Exercise Move Components]
.. 5. [Workout Plan Components]
.. 6. [Class Schedule Components]
6. [Sources and Credit]


## Overview



## Get Started

Please note, Pipenv is required. See [here](https://pipenv.pypa.io/en/latest/installation/) for installing pipenv. Please install the python version that my application uses. My project utilzies python_version = "3.8.13".

- Clone this repo
- `cd` into the folder
- Run `pipenv install`
- Run `pipenv shell`
- `cd` into the `server` folder
- Run `flask db upgrade`
- Run `python seed.py`
- Run `python app.y`
- Open another terminal (ensure you're within the parent folder of the repo)
- Run `npm install -prefix client`
- Run `npm start -prefix client`

Your browser should open to http://localhost:3000/ and my fullstack app will run successfully. Explore arond, provide feedback if you like, and thank you for visiting!


## Detailed Project Info

My project is broken into two major parts: 
- the backend which covers the DB tables, the relationships between them, and the various API's and RESTful views.
- the frontend which covers all of the various React compoments that visually make my application.

Below covers the details of each and the various importmant files and functions that make it work.


## Backend Details

My project uses python as the backend language, Flask as the web framework, sqlite as the database, SQLAlchemy as the ORM, and marshmallow for object serializaiton. 


### app.py

This is my flask application. There are 4 views it provides; `Coach`, `Workout_Plan`, `Exercise_Move`, `Schedule`. It is broken down into 2 main substructures to handle this:
1. The API schema plans:
    - Each of the schemas inhertits from the `flask_marshmallow` libray. To automate and make life easier, I use utilize Flask's auto generating class to automatically generate the API for each of the columns of the tables. 
    - For the Schedule and Workout_Plan schema, I use the `fields` function from the `marshmallow` (and not from `flask_marshmallow`) library to load in the many to many relationship records. Additionally, only specific columns are loaded to prevent a circular recursion issue.
    - For each of the schemas, the application create 2 object versions to handle a singular or a list of records to serialize

2. RESTFUL API Routes:
    - Each of the views inherits `Resources` from `flask_restful` library
    - Each of the views have 2 versions: the base `/route` path and the `/route/id` path.
    - This application follows RESTful conventions:
        - Base `/route` paths handle GET actions for all records and POST actions for creating single records
        - `/route/id` paths handle GET, PATCH, and DELETE actions for single records
    - This application follows the project requirements: All tables / views have CREATE, READ actions plus EDIT as well
    - This application follows the project requirements: The `Schedule` table / view also has DELETE actions

IMPORTANT: Even though `Crossfit_Class` table is not explicity provided a view, records in this table are created, read, and edited via assiocation proxy established within the Workout_Plan model. 

### models.py

(Image map of my table)

Here we have my application's database table models. There are 5 tables in use here:
- Three of those tables are 1-to-many tables (`Exercise_Move`, `Coach`, `Workout_Plan`)
- Two of those tables are many-to-many (`Crossfit_Class`, `Schedule`)
- `Coach` and `Workout_Plan` have a many-to-many relationship, using `Schedule` as the intermediatry
- `Schedule` also has 2 user submitiable attributes (`day` and `hour`)
- `Workout_Plan` and `Exercise_Move` have a many to many relationship using association proxy and `Crossfit_Class` as the intermediatry

`Coach -> Schedule <- Workout_Plan -> Crossfit_Class <- Exercise_Move`


### seed.py

My seed file populates the database. It is broken down into the following steps
- deletes all of the current records
- creates all of the 1-to-many records first (`Exercise_Move`, `Coach`, `Workout_Plan`) and passes them to the function that adds it to the DB
- relates the `Exercise_Move` records to `Workout_Plan` records and passes them to the function that adds it to the DB
- creates the `Schedule` records with two of the generated user submitted attributes and passes them to the function that adds it to the DB
- relates the `Schedule` records with randomly selected `Coach` and `Workout_Plan` records, and passes them to the function that adds it to the DB


### config.py

This file contains all of the library imports and instantiations of various apps and settings. The following is performed:
- Creates the flask instance, links the database, and configures various settings
- Defines the metadata and creates a Flask SQLAlchemy extension
- Creates a flask migrate object to manage database schema migrations
- Initialize the flask app to use the database
- Instanizate REST API, marshamallow serialzier, and CORS


## Frontend Details


### Hierarchy Structure


### App and Header Components


### PageFrame and ListData Components


### Coach Components


### Exercise Move Components


### Workout Plan Components


### Class Schedule Components


## Sources and Credit




## Resources

- [Setting up a respository - Atlassian](https://www.atlassian.com/git/tutorials/setting-up-a-repository)
- [Create a repo- GitHub Docs](https://docs.github.com/en/get-started/quickstart/create-a-repo)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
- [Python Circular Imports - StackAbuse](https://stackabuse.com/python-circular-imports/)
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/)
