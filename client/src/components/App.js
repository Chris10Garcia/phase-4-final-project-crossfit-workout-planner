import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";


function Header(){
  return (
    <h1>Welcome to Flatiron Crossfit</h1>
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
    <h2>Here is the coach</h2>
  )
}

function App() {
  return (
  < >
    <Header />
    <Switch>
      <Route exact path = "/">
        <ClassSchedule />
      </Route>
      <Route> 
        <WorkoutPlan path = "/workout_plans" />
      </Route>
      <Route>
        <ExerciseMove path = "/exercise_moves" />
      </Route>
      <Route>
        <Coach path = "/coaches" />
      </Route>
    </Switch>
  </>
  )

}

export default App;
