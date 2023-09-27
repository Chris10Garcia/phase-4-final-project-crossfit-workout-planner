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

function ClassSchedule(){

  return (
    <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
  )
}

function WorkoutPlan(){

  return (
    <h2>Here is the workout plan</h2>
  )
}

function ExerciseMove(){


  return (
    <h2>Here is the exercise move info</h2>
  )
}

function Coach(){

  return (
    <h2>Here are the coaches</h2>
  )
}

function App() {
  const [coaches, setCoaches] = useState([])
  const [moves, setMoves] = useState([])
  const [classes, setClasses] = useState([])
  const [plans, setPlans] = useState([])

  useEffect(()=>{
    fetch("/workout_plans")
      .then( r => r.json())
      .then( d => setPlans(d))
  }, [])


  useEffect(()=>{
    fetch("/schedules")
      .then( r => r.json())
      .then( d => setClasses(d))
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

  console.log(coaches)
  console.log(moves)
  console.log(plans)
  console.log(classes)
  
  return (
  < >
    <Header />
    <Switch>
      <Route exact path = "/">
        <ClassSchedule />
      </Route>
      <Route path = "/workout_plans" > 
        <WorkoutPlan />
      </Route>
      <Route path = "/exercise_moves" >
        <ExerciseMove />
      </Route>
      <Route path = "/coaches" >
        <Coach />
      </Route>
    </Switch>
  </>
  )

}

export default App;
