import React, { useEffect, useState } from "react";
import { Switch, Route} from "react-router-dom";
import { 
  Segment as SegmentUI, } from 'semantic-ui-react'

import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import WorkoutPlan from "./WorkoutPlan";
import ExerciseMove from "./ExerciseMove";
import Coach from "./Coach";


/*
Adding forms Brainstorming

ClassScheduling
- add form there
- If workout plan that you want doesn't exist, then go to WorkOutPlan page to create it
- Have option to edit and delete as well
- Deleting schedule doesn't delete the other records associated with it

Workout Plan
- add form there
- If exercise move isn't there, go to ExerciseMove Page to create it there
- Create only. Maybe deal with edit but not sure how to deal with other state variables

Exercise Plan
- add form there

Coach
- add form there 
- OPTIONAL: 
  - if i do authentication, have coach can edit their own profile
  - move the adding coach form to sign up / log in page

*/




function App() {
  const [coaches, setCoaches] = useState([])
  const [moves, setMoves] = useState([])
  const [sch_classes, setSchClasses] = useState([])
  const [plans, setPlans] = useState([])

  useEffect(()=>{
    fetch("/workout_plans")
      .then( r => r.json())
      .then( d => setPlans(d))
  }, [])

  useEffect(()=>{
    fetch("/schedules")
      .then( r => r.json())
      .then( d => setSchClasses(d))
  }, [])

  useEffect(()=>{
    fetch("/coaches")
      .then( r => r.json())
      .then( d => setCoaches(d))
  }, [])

  useEffect(()=>{
    fetch("/exercise_moves")
      .then( r => r.json())
      .then( d => setMoves(d))
  }, [])


  return (
  <SegmentUI.Group>
    <Header />
    <Switch>
      <Route exact path = "/">
        <ClassSchedule sch_classes = { sch_classes }/>
      </Route>
      <Route path = "/workout_plans" > 
        <WorkoutPlan plans = { plans } />
      </Route>
      <Route path = "/exercise_moves" >
        <ExerciseMove moves = { moves } />
      </Route>
      <Route path = "/coaches" >
        <Coach coaches = {coaches}/>
      </Route>
    </Switch>
  </ SegmentUI.Group>
  )

}

export default App;
