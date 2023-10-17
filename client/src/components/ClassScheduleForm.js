import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

import {
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI,
  Card as CardUI
} from "semantic-ui-react";


function ClassScheduleForm({ title, formData, setFormData, refresh, setRefresh, plans, coaches, days, clearFormValues }) {

  const hours = []
  for (let i = 800; i < 1800; i = i + 100){
    hours.push(i)
  }


  const formSchema = yup.object().shape({
    day : yup.string()
      .required("Must select a day")
    ,
    hour : yup.string()
      .required("Must select an hour")
    ,
    coach : yup.object()
      .shape({id: yup.number().required("Must make a Coach selection")})
    ,
    workout_plan : yup.object()
      .shape({id: yup.number().required("Must make a workout plan selection")})

  })
  

  function clearForm(){
    setFormData(clearFormValues)  
  }

  function submitData(data){
    if (data.id === ""){
      fetch("/schedules", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
      })
      .then ( r => {
        if (r.ok){
          r.json().then(data => {
            setRefresh(!refresh)
            setFormData(data)
          })
        } else {
          r.json().then(err => console.log(err))
        }
      })

    } else {
      fetch(`/schedules/${data.id}`, {
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
      })
      .then ( r => {
        if (r.ok){
          r.json().then(data => {
            setRefresh(!refresh)
            setFormData(data)
            })
        } else {
          r.json().then(err => console.log(err))
        }
      })                  
    }
  }

  return (
    <CardUI> 
      <CardUI.Content>
        <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit Class Schedule ID: ${formData.id}` : `Add a new ${title}`}</HeaderUI>
        <Formik onSubmit= {submitData} initialValues={formData} enableReinitialize = {true} validationSchema={formSchema}>
          { formik => ( 
            <FormUI onSubmit={formik.handleSubmit} >

              <FormUI.Field disabled label = "ID" control="input" name="id" onChange={formik.handleChange} value={formik.values.id} />

              <FormUI.Field label = "Select Day" control="select" onChange={formik.handleChange} name="day" value={formik.values.day} >
                <option value= "" label = "Select Option" />
                { days.map( day => <option value={day} label = {day} key = {day} /> )}
              </FormUI.Field>
              <b><p style={{color: "red"}}>{formik.errors.day}</p></b>

              <FormUI.Field label = "Select Time" control="select" onChange={formik.handleChange} name="hour" value={formik.values.hour} >
                <option value="" label ="Select Option"></option>
                { hours.map ( hour => <option value = {hour} label = {hour } key = {hour} /> )}
              </FormUI.Field>          
              <b><p style={{color: "red"}}>{formik.errors.hour}</p></b>

              <FormUI.Field label = "Select Workout Plan To Schedule" control="select" onChange={formik.handleChange} name="workout_plan.id" value={formik.values.workout_plan.id}>
                <option value="" label ="Select Option"></option>
                { plans.map( plan => <option value={plan.id} label = {plan.name } key = {plan.id} /> )}
              </FormUI.Field>
              { "workout_plan" in formik.errors ? <b><p style={{color: "red"}}>{formik.errors.workout_plan.id}</p></b> : ""}

              <FormUI.Field label="Select Coach to Schedule" control="select" onChange={formik.handleChange} name="coach.id" value={formik.values.coach.id}>
                <option value="" label ="Select Option"></option>
                { coaches.map( coach => <option value={coach.id} label = {coach.name } key = {coach.id} /> )}
              </FormUI.Field>    
              { "coach" in formik.errors ? <b><p style={{color: "red"}}>{formik.errors.coach.id}</p></b> : ""}

              <DividerUI />
              <br />

              <FormUI.Button type="submit" label="Submit">Submit</FormUI.Button>
              <DividerUI />
              
              { formData.id === "" ? "" : <FormUI.Button type="button" onClick={clearForm}>Click to Clear and Add New</FormUI.Button> }

            </FormUI>
          )}

        </Formik>
      </CardUI.Content>
    </CardUI>
  );
}

export default ClassScheduleForm