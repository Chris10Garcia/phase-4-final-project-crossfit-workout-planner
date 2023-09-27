import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { 
  Segment as SegmentUI, 
  Header as HeaderUI,
  Card as CardUI,
  Feed as FeedUI,
  Container as ContainerUI
} from 'semantic-ui-react'
import Header from "./Header";


function ClassScheduleDetails( { day, classesFiltered }){
  const feedClassesContentJSX = classesFiltered.map(class_details => {
    return (
      <FeedUI.Event>
        <FeedUI.Content>
          <FeedUI.User>{class_details.hour}</FeedUI.User>
          <FeedUI.Summary> {class_details.coach.name} </FeedUI.Summary>
          <FeedUI.Extra text> {class_details.workout_plan.name }</FeedUI.Extra>
        </FeedUI.Content>
      </FeedUI.Event>
    )
  })

  return(
    <>
      <CardUI.Content>
        <CardUI.Header>{ day }</CardUI.Header>
      </CardUI.Content>
      <CardUI.Content>
        <FeedUI>
          {feedClassesContentJSX}
        </FeedUI>
      </CardUI.Content>
    </>
  )
}

function ClassSchedule( {sch_classes} ){
  const days = new Set()

  sch_classes.forEach(element => {
    days.add(element.day)
  });
  
  const classDetailsJSX = [...days].map( day => {
    const classesFiltered = sch_classes.filter( sch_classes => {
      return day === sch_classes.day
    })

    return(
      <ClassScheduleDetails key = {day}  day = {day} classesFiltered = { classesFiltered }/>
    )
  })

  return (
    <SegmentUI>
      <HeaderUI>
        <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
      </HeaderUI>
      <CardUI fluid>
        { classDetailsJSX }
      </CardUI>
    </SegmentUI>
  )
}

function WorkoutPlan( {plans} ){
  // console.log(plans)

  return (
    <h2>Here is the workout plan</h2>
  )
}

function ExerciseMove( { moves } ){
  // console.log(moves)

  return (
    <h2>Here is the exercise move info</h2>
  )
}

function Coach( { coaches } ){
  // console.log(coaches)

  return (
    <h2>Here are the coaches</h2>
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
