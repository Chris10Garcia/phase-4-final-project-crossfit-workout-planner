import React, { useEffect, useState } from "react";
import { Switch, Route, useParams} from "react-router-dom";
import { 
  Segment as SegmentUI, 
  Header as HeaderUI,
  Container as ContainerUI,
  Grid as GridUI,
  Card as CardUI,
  Divider as DividerUI,
  Feed as FeedUI} from 'semantic-ui-react'

import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import PageFrame from "./PageFrame";


function WorkoutPlanDetails({dataList}){
  const params = useParams()
  const workoutPlan = dataList[params.itemID - 1]

  if (!workoutPlan) return <h2>page loading...</h2>

  const { exercise_moves } = workoutPlan

  const exerciseMovesJSK = exercise_moves.map(move => {
      return(
          <ContainerUI key = {move.id}>
                <HeaderUI as= "h4">{move.name}</HeaderUI>
                <p><b>Move focus:</b> {move.focus}</p>
                <p><b>Description:</b>  {move.description}</p>
                <p><b>Video URL Link:</b> <a href={move.video_link}>{move.video_link}</a></p>
                <DividerUI></DividerUI>
          </ContainerUI>
      )
    })

  return(
    <React.Fragment>
      <HeaderUI> Workout Plan Details</HeaderUI>
      <HeaderUI as="h2">{workoutPlan.name}</HeaderUI>
      <p><b>Workout Plan ID:</b> {workoutPlan.id}</p>
      <p><b>Difficulty:</b> {workoutPlan.difficulty}</p>
      <p><b>Description:</b> {workoutPlan.description}</p>
      <DividerUI />
      <HeaderUI as="h3">Exercise Moves Involved </HeaderUI>
          <SegmentUI padded>
                {exerciseMovesJSK}
          </SegmentUI>
    </React.Fragment>
  )
}

function WorkoutPlan( {plans} ){
  return (
    <PageFrame 
        title = {"Workout Plan"}
        dataList = {plans}
    >
      <WorkoutPlanDetails dataList={plans}/>
    </PageFrame>
  )
}

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
