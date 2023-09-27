import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";


function Header(){
  return (
    <div 
      style={{
        borderBottom: "2px solid black",
        paddingBottom: "10px",
        marginBottom: "12px",
      }}
    >
      <h1>Welcome to Flatiron Crossfit</h1>
      <NavLink exact to= "/">
        Class Schedule
      </NavLink>
      <NavLink to ="/workout_plans">
        Workout Plans
      </NavLink>
      <NavLink to = "/exercise_moves">
        Exercise Moves
      </NavLink>
      <NavLink to ="/coaches">
        Coaches
      </NavLink>
    </div>
  )
}

function ClassSchedule( {sch_classes} ){
  console.log(sch_classes)

  return (
    <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
  )
}

function WorkoutPlan( {plans} ){
  console.log(plans)
  return (
    <h2>Here is the workout plan</h2>
  )
}

function ExerciseMove( { moves } ){
  console.log(moves)

  return (
    <h2>Here is the exercise move info</h2>
  )
}

function Coach( { coaches } ){
  console.log(coaches)
  
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
  < >
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
  </>
  )

}

export default App;
