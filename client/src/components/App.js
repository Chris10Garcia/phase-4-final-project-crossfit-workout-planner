import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import WorkoutPlan from "./WorkoutPlan";
import ExerciseMove from "./ExerciseMove";
import Coach from "./Coach";

import {Formik, Form, Field, FieldArray } from "formik"

import { 
  Segment as SegmentUI, 
  } from 'semantic-ui-react'

/*

Coach
- OPTIONAL: 
  - if i do authentication, have coach can edit their own profile
  - move the adding coach form to sign up / log in page

*/


function BlogApp(){
  /* 
  NOT TO BE GRADED. PURPOSE OF THIS COMPONENT IS TO ENSURE CODE WORKS FOR MY BLOG ENTRY

  Blog Form should cover 
  - a field
  - drop down
  - an array
    - drop down
    - field
  
  form values to control
  - Single fields
    - student name = text field
    - favorite color = drop down
  - Array
    - subject taking = drop down
    - grade = field
  */


  const initialValues = {
    name : "",
    color : "",
    records : [ {subject :"", grade : "" }]
  }

  const colors = ["Red", "Green", "Blue", "White", "Black", "Yellow", "Orange"]
  const subjects = ["Calculus", "English Lit", "History", "Social Studies", "Physics"]

  return(
    <div>
      <h1>Blog Code</h1>
      
      <Formik 
              initialValues={initialValues}  
              onSubmit={ values => console.log(values)} >

        {formik => ( 
          <Form>
            <Field name = "name" placeholder="Jane Doe" label="Student Name" /> <br /> <br />

            <Field name= "color" as = "select" >
              <option label="Make a section" value=""/>
              { colors.map( color => <option key={ color } label={ color } value={ color } /> )}
            </Field> <br /><br /> <br />

            <FieldArray name= "records"  >

                { ( {push, remove}) => ( 
                  <div>
                    <div>
                      { formik.values.records.length > 0 && formik.values.records.map ( (record, index ) => ( 
                            <div key={index} style={{border:"3px solid black"}}>
                                
                                <label>Grade Value</label>
                                <Field name = {`records.${index}.grade`} /> <br /><br />
                                
                                <label>Subject</label>
                                <Field name= {`records.${index}.subject`} as = "select" >
                                  <option label="Make a section" value=""/>
                                  { subjects.map( subject => <option key={ subject } label={ subject } value={ subject } /> )}
                                </Field> <br /><br />

                                <button type="button" onClick={() => remove(index)}>Remove</button><br /><br /><br />

                              </div> 
                        ))}
                        
                    </div>
                    <button type="button" onClick={() => push({grade: "", subject: ""}) }>Add More</button><br /><br />
                  </div>
                )}
              
            </FieldArray>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>

    </div>
  )
}

function App() {
  const [coaches, setCoaches] = useState([])
  const [moves, setMoves] = useState([])
  const [sch_classes, setSchClasses] = useState([])
  const [plans, setPlans] = useState([])
  const [refresh, setRefresh] = useState(false)

  // I should just one useEffect and call all 4 fetches within
  useEffect(()=>{
    fetch("/workout_plans")
      .then( r => r.json())
      .then( d => setPlans(d))
  }, [refresh])

  useEffect(()=>{
    fetch("/schedules")
      .then( r => r.json())
      .then( d => setSchClasses(d))
  }, [refresh])

  useEffect(()=>{
    fetch("/coaches")
      .then( r => r.json())
      .then( d => setCoaches(d))
  }, [refresh])

  useEffect(()=>{
    fetch("/exercise_moves")
      .then( r => r.json())
      .then( d => setMoves(d))
  }, [refresh])


  return (
  <SegmentUI.Group>
    <Header />
    <Switch>
      <Route exact path = "/">
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
      <Route path = "/blog" >
        <SegmentUI>
          <BlogApp  />
        </SegmentUI>
      </Route>
    </Switch>
  </ SegmentUI.Group>
  )

}

export default App;
