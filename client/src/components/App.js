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
I can bring down state for each fetch. however, I will need one state for refreshing the page at the top level
reason: If i add a new coach, i need the other APIs to fetch again, etc
Actually nevermind. I need to keep it high. Certain pages require knowing what records are available in the other APIs
*/

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
  const [refresh, setRefresh] = useState(false)

  useEffect(()=>{
    fetch("/workout_plans")
      .then( r => r.json())
      .then( d => setPlans(d))
  }, [refresh])

  useEffect(()=>{
    fetch("/schedules")
      .then( r => r.json())
      .then( d => setSchClasses(d))
  }, [refresh])

  useEffect(()=>{
    fetch("/coaches")
      .then( r => r.json())
      .then( d => setCoaches(d))
  }, [refresh])

  useEffect(()=>{
    fetch("/exercise_moves")
      .then( r => r.json())
      .then( d => setMoves(d))
  }, [refresh])


  return (
  <SegmentUI.Group>
    <Header />
    <Switch>
      <Route exact path = "/">
        <ClassSchedule sch_classes = { sch_classes } refresh={refresh} setRefresh ={setRefresh}/>
      </Route>
      <Route path = "/workout_plans" > 
        <WorkoutPlan plans = { plans } refresh={refresh} setRefresh ={setRefresh}/>
      </Route>
      <Route path = "/exercise_moves" >
        <ExerciseMove moves = { moves } refresh={refresh} setRefresh ={setRefresh} />
      </Route>
      <Route path = "/coaches" >
        <Coach coaches = {coaches} refresh={refresh} setRefresh ={setRefresh}/>
      </Route>
    </Switch>
  </ SegmentUI.Group>
  )

}

export default App;
