import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, NavLink, useParams} from "react-router-dom";
import { 
  Segment as SegmentUI, 
  Header as HeaderUI,
  Container as ContainerUI,
  Grid as GridUI,
  Menu as MenuUI,
  Card as CardUI,
  Divider as DividerUI,
  Feed as FeedUI,
  Placeholder as PlaceholderUI
} from 'semantic-ui-react'

import Header from "./Header";
import ClassSchedule from "./ClassSchedule";


function ListData ( {dataList} ){
  const match = useRouteMatch()

  if (dataList.length === 0) return (
    <React.Fragment>
      <HeaderUI as= "h3">Please wait while backend server starts up and pulls data </HeaderUI>
      <PlaceholderUI fluid>
        <PlaceholderUI.Paragraph>
          <PlaceholderUI.Line /><PlaceholderUI.Line /><PlaceholderUI.Line /><PlaceholderUI.Line />
        </PlaceholderUI.Paragraph>
      </PlaceholderUI>
    </React.Fragment>
  )
  
  const dataListJSK = dataList.map ( data => {
    return(
      <MenuUI.Item 
        key = {data.id}
        name = {data.name}
        as = {NavLink}
        to = {`${match.url}/${data.id}`}
        color = {"red"}
      />
    )
  })

  return (
    <MenuUI size = "large" vertical fluid>
      { dataListJSK }
    </MenuUI>
  )
}



function PageFrame({children, title, dataList }){
  const match = useRouteMatch()
  return (
    <SegmentUI>
      <HeaderUI>
        <h2>{title} Page</h2>
      </HeaderUI>
      <GridUI celled columns="equal">
        <GridUI.Row>
          <GridUI.Column width = {3}>
            <HeaderUI>
              <h3>{title} List</h3>
            </HeaderUI>
            <ListData dataList = {dataList} />
          </GridUI.Column>
          <GridUI.Column>
            
            <Route exact path = {`${match.url}`}>
              <HeaderUI>
                      <h3>Select the {title} on the left</h3>
              </HeaderUI>
            </Route>

            <Route path = {`${match.url}/:itemID`}>
              { children }
            </Route>

          </GridUI.Column>
        </GridUI.Row>
      </GridUI>
    </SegmentUI>
  )  
}

function WorkoutPlanDetails({dataList}){
  const params = useParams()

  const workoutPlan = dataList[params.itemID - 1]

  if (!workoutPlan) return <h2>page loading...</h2>

  const { exercise_moves } = workoutPlan
  
  console.log(exercise_moves)

  const exerciseMovesJSK = exercise_moves.map(move => {
    return(
        <GridUI key = {move.id} celled>
          <HeaderUI as= "h2">{move.name}</HeaderUI>
            {move.focus}
            {move.description}
            <p>Video URL Link: <a href={move.video_link}>{move.video_link}</a></p>
        </GridUI>
    )
  })

  return(
    <React.Fragment>
      <HeaderUI> Workout Plan Details</HeaderUI>
        <HeaderUI as="h1">{workoutPlan.name}</HeaderUI>
        <p>Workout Plan ID: {workoutPlan.id}</p>
        <p>Difficulty: {workoutPlan.difficulty}</p>
        <p>Description: {workoutPlan.description}</p>
        <HeaderUI as="h3">Exercise Moves Involved</HeaderUI>
            {exerciseMovesJSK}
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
