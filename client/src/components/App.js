import React, { useEffect, useState, useContext, createContext } from "react";
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
import { Field, Form, Formik } from "formik";


const CurrentUserContext = createContext(null)


function LogIn(){
  const {user, setUser} = useContext(CurrentUserContext)

  return(
  
  <React.Fragment>
    <Formik
      initialValues = { {username : "",}}
      onSubmit={values => {
        
        console.log(values)
        fetch("/login", {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(values) 
        })
        .then(r => {
          console.log(r)
          if (r.ok){
            r.json().then(data => setUser(data))
          } else {
            r.json().then( err => console.log(err)) // log in failed, try again
          }
        })
        }      
      }
    >

      {formik => (
            <Form>
              <label>Username</label>
              <Field id="username" name="username" placeholder= "Type in username" value={formik.values.username} onChange = {formik.handleChange}/>
              <button type="submit">Submit</button>
            </Form>
      )}

    </Formik>
    <p>Current user is {user ? user.name : null}</p>
  </React.Fragment>
  
  )
}

function App() {
  const [coaches, setCoaches] = useState([])
  const [moves, setMoves] = useState([])
  const [sch_classes, setSchClasses] = useState([])
  const [plans, setPlans] = useState([])
  const [refresh, setRefresh] = useState(false)

  const [user, setUser] = useState(null)


  useEffect(()=>{
    
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
          <h1>Welcome and log in here</h1>
          <LogIn />
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
