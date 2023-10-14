# Phase 4 Project: Flatiron Crossfit


## Table of Content

1. [Overview](#overview)
2. [Get Started](#get-started)
3. [Detailed Project Info](#detailed-project-info)
4. [Backend Details]
.. 1. [Config]
.. 2. [Models]
.. 3. [Seed]
.. 4. [App]
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

Please note, Pipenv is required. See [here](https://pipenv.pypa.io/en/latest/installation/) for installing pipenv. Lastly, my project uses python_version = "3.8.13".

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

Your browser should open to http://localhost:3000/ and my fullstack app will run successfully. Play around with it and thank you for visiting!


## Detailed Project Info

My project is broken into two major parts: 
- the backend which covers the DB tables, the relationships between them, and the various API's and RESTful views.
- the frontend which covers all of the various React compoments that visually make my application.


## Backend Details


### config.py


### models.py


### seed.py


### app.py



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
