import React, { useEffect, useState } from "react";
import { HashRouter, Switch, Route, useRouteMatch, NavLink, Link, useParams} from "react-router-dom";
import { 
  Segment as SegmentUI, 
  Header as HeaderUI,
  Card as CardUI,
  Feed as FeedUI,
  Divider as DividerUI,
  Container as ContainerUI,
  Grid as GridUI,
  Menu as MenuUI,
  Placeholder as PlaceholderUI
} from 'semantic-ui-react'
import Header from "./Header";


function ClassScheduleDetails( { day, sch_classes }){

  const classesFiltered = sch_classes.filter( sch_classes => day === sch_classes.day)

  const feedClassesContentJSX = classesFiltered.map(class_details => {
    return (
            <FeedUI.Event key = {class_details.id}>
              <FeedUI.Content>
                <HeaderUI as="h4">Workout Plan: <a>{class_details.workout_plan.name } </a>
                  <FeedUI.Meta>Difficulty: {class_details.workout_plan.difficulty} </FeedUI.Meta>
                </HeaderUI>
                
                <FeedUI.Summary>Time: {class_details.hour}</FeedUI.Summary>
                
                Coach: <FeedUI.User href="/coaches" >{class_details.coach.name} </FeedUI.User>
                <DividerUI />
              </FeedUI.Content>
            </FeedUI.Event>
    )
  })


  return(
    <CardUI>
      <CardUI.Content>
        <CardUI.Header as = "h1"> { day } </CardUI.Header>
      </CardUI.Content>
      <CardUI.Content>
        <FeedUI>
          {feedClassesContentJSX}
        </FeedUI>
      </CardUI.Content>
    </ CardUI>
  )
}

function ClassSchedule( {sch_classes} ){
  const days = new Set()

  sch_classes.forEach(element => days.add(element.day) );
  
  const classDetailsJSX = [...days].map( day => <ClassScheduleDetails key = {day}  day = {day} sch_classes = { sch_classes }/> )

  return (
    <SegmentUI>
      <HeaderUI>
        <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
      </HeaderUI>
      <CardUI.Group>
        { classDetailsJSX }
      </CardUI.Group>
    </SegmentUI>
  )
}



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

  const data = dataList[params.itemID - 1]

  if (!data) return <h2>page loading...</h2>

  
  return(
    <React.Fragment>
      <HeaderUI> Workout Plan Details for {data.name} </HeaderUI>
      <ContainerUI>
        
      </ContainerUI>
    </React.Fragment>
  )
}

function WorkoutPlan( {plans} ){
  // console.log(plans)
  // const match = useRouteMatch()
  // console.log(match)
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
  // console.log(coaches)

  return (
    <PageFrame 
        title = {"Coach"}
        dataList = {coaches}
    />
  )
  // return (
  //   <SegmentUI>
  //     <HeaderUI>
  //       <h2>Here are the Coaches</h2>
  //     </HeaderUI>
  //     <GridUI celled columns="equal">
  //       <GridUI.Row>
  //         <GridUI.Column width = {3}>
  //           <HeaderUI>
  //             <h3>List of Coaches</h3>
  //           </HeaderUI>
  //           <ListData dataList = {coaches}/>
  //         </GridUI.Column>
  //         <GridUI.Column fluid>
  //         <HeaderUI>
  //             <h3>Coach Selected</h3>
  //           </HeaderUI>
  //         </GridUI.Column>
  //       </GridUI.Row>
  //     </GridUI>
  //   </SegmentUI>
  // )  
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
