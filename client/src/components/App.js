import React, { useEffect, useState } from "react";
import { Switch, Route} from "react-router-dom";
import { 
  Segment as SegmentUI, 
  Container as ContainerUI,
  Card as CardUI,
  Feed as FeedUI} from 'semantic-ui-react'

import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import PageFrame from "./PageFrame";
import WorkoutPlan from "./WorkoutPlan";


function ExerciseMove( { moves } ){

  return (
    <PageFrame 
        title = {"Exercise Move"}
        dataList = {moves}
    />
  )
}

function Coach( { coaches } ){
  return (
    <PageFrame 
        title = {"Coach"}
        dataList = {coaches}
    />
  )

}

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
