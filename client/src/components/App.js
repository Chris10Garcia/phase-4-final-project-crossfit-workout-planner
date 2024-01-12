import React, { useEffect, useState, createContext } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import WorkoutPlan from "./WorkoutPlan";
import ExerciseMove from "./ExerciseMove";
import Coach from "./Coach";
import BlogApp from "./BlogApp";

import { 
  Segment as SegmentUI, 
  } from 'semantic-ui-react'
import { LogInForm } from "./LogInForm";
import { HomePage } from "./HomePage";


const CurrentUserContext = createContext(null)


function App() {
  const [coaches, setCoaches] = useState([])
  const [moves, setMoves] = useState([])
  const [sch_classes, setSchClasses] = useState([])
  const [plans, setPlans] = useState([])
  const [refresh, setRefresh] = useState(false)

  const [user, setUser] = useState(null)


  useEffect(()=>{

    fetch("/checkSession")
      .then( r => {
        if (r.ok){
          r.json().then(data => setUser(data))
        }
      } )
      
    fetch("/workout_plans")
      .then( r => r.json())
      .then( d => setPlans(d))

    fetch("/schedules")
      .then( r => r.json())
      .then( d => setSchClasses(d))

    fetch("/coaches")
      .then( r => r.json())
      .then( d => setCoaches(d))

    fetch("/exercise_moves")
      .then( r => r.json())
      .then( d => setMoves(d))

  }, [refresh])

  return (
  <CurrentUserContext.Provider value={{user, setUser}}>
    <SegmentUI.Group>
      <Header />
      <Switch>
        <Route exact path = "/">
          { user ? <HomePage sch_classes = {sch_classes} plans = { plans } coaches = {coaches} refresh={refresh} setRefresh ={setRefresh} /> : <LogInForm />}
        </Route>
        <Route path = "/schedules">
          <ClassSchedule sch_classes = { sch_classes } plans = { plans } coaches = {coaches} refresh={refresh} setRefresh ={setRefresh}/>
        </Route>
        <Route path = "/workout_plans" > 
          <WorkoutPlan plans = { plans } moves={ moves } refresh={refresh} setRefresh ={setRefresh}/>
        </Route>
        <Route path = "/exercise_moves" >
          <ExerciseMove moves = { moves } refresh={refresh} setRefresh ={setRefresh} />
        </Route>
        <Route path = "/coaches" >
          <Coach coaches = {coaches} refresh={refresh} setRefresh ={setRefresh}/>
        </Route>

        {/* NOT TO BE GRADED. PURPOSE OF THIS IS TO ENSURE CODE FOR BLOG WORKS */}
        <Route path = "/blog" >
          <SegmentUI>
            <BlogApp  />
          </SegmentUI>
        </Route>

      </Switch>
    </ SegmentUI.Group>
  </CurrentUserContext.Provider>
  )

}

export default App;
export {CurrentUserContext}
