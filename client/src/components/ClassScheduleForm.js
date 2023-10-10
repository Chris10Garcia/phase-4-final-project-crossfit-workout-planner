import React from "react";
import * as yup from "yup";
import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI,
  Button as ButtonUI,
  Card, Feed
} from "semantic-ui-react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

function ClassScheduleForm({ title, formData, setFormData, refresh, setRefresh, plans, coaches }) {

  const history = useHistory()


  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const hours = []
  for (let i = 900; i < 1800; i = i + 100){
    hours.push(i)
  }

  // REDO THIS
  // const formSchema = yup.object().shape({
  //   // id: yup.number().integer(),
  //   name: yup.string(),
  //   focus: yup.string(),
  //   description: yup.string(),
  //   video_link: yup.string()
  // });


  function clearForm(){
    setFormData({
      id : "",
      day: "",
      hour: "",
      coach: {id: "", name: ""},
      workout_plan: {id: "", name : "", difficulty : ""}
    }
    )  
  }

  // REDO THIS
  // Optional. Clearing the attrs because it clogs the console.log. what only matters is the ID that gets updated.
  // maybe on a subsiquent update i'll remove this once everything works
  function helperClearAttrs(data){
    data.exercise_moves.forEach( move => {
      delete move.description
      delete move.name
      delete move.video_link
      delete move.focus
    })
    return data
  }


  return (
    <Card> 
    <Card.Content>
      <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit Class Schedule ID: ${formData.id}` : `Add a new ${title}`}</HeaderUI>
      
      <Formik 
              onSubmit={(data)=>{
                console.log(data)
                // helperClearAttrs(data)
                
                // // REDO THIS
                // if (data.id === ""){
                //   fetch("/workout_plans", {
                //     method: "POST",
                //     headers: {"Content-Type" : "application/json"},
                //     body: JSON.stringify(data)
                //   })
                //   .then ( r => {
                //     if (r.ok){
                //       r.json().then(data => {
                //         setRefresh(!refresh)
                //         history.push(`${data.id}`)
                //       })
                //     } else {
                //       r.json().then(err => console.log(err))
                //     }
                //   })

                // } else {

                //   fetch(`${data.id}`, {
                //     method: "PATCH",
                //     headers: {"Content-Type" : "application/json"},
                //     body: JSON.stringify(data)
                //   })
                //   .then ( r => {
                //     if (r.ok){
                //       r.json().then(data => setRefresh(!refresh))
                //     } else {
                //       r.json().then(err => console.log(err))
                //     }
                //   })                  
                // }
              }
            }
              initialValues={formData} 
              enableReinitialize = { true } >

      { formik => (
        <FormUI onSubmit={formik.handleSubmit} >

          {/* WHY DOES THIS NEED TO BE A FIELD? IT COULD BE JUST AN HTML ELEMENT DISPLAYING OR NOT THE ID */}
          <FormUI.Field disabled>
            <label>ID</label>
            <FormUI.Input id="id" name="id" onChange={formik.handleChange} value={formik.values.id} />
          </FormUI.Field>

          <FormUI.Field label = "Select Time" control="select" onChange={formik.handleChange} name="hour" value={formik.values.hour} >
            <option value="" label ="Select Option"></option>
            { hours.map ( hour => <option key = {hour} value = {hour} label = {hour }></option>)}
          </FormUI.Field>          

          <FormUI.Field label = "Select Day" control="select" onChange={formik.handleChange} name="day" value={formik.values.day} >
            <option value="" label ="Select Option"></option>
            { days.map( day => <option key = {day} value={day} label = {day} ></option>)}
          </FormUI.Field>

          <FormUI.Field label = "Select Workout Plan To Schedule" control="select" onChange={formik.handleChange} name="workout_plan.id" value={formik.values.workout_plan.id}>
            <option value="" label ="Select Option"></option>
            { plans.map( plan => <option key = {plan.id} value={plan.id} label = {plan.name } ></option>)}
          </FormUI.Field>

          <FormUI.Field label="Select Coach to Schedule" control="select" onChange={formik.handleChange} name="coach.id" value={formik.values.coach.id}>
            <option value="" label ="Select Option"></option>
            { coaches.map( coach => <option key = {coach.id} value={coach.id} label = {coach.name } ></option>)}
          </FormUI.Field>      

          <DividerUI />
          <br />

        <FormUI.Button type="submit">Submit</FormUI.Button>
      
        <DividerUI />
        { formData.id === "" ? "" : <FormUI.Button type="button" onClick={clearForm}>Click to Clear and Add New</FormUI.Button> }

      </FormUI>
      )}
      </Formik>
      </Card.Content>
    </Card>
  );
}

export default ClassScheduleForm