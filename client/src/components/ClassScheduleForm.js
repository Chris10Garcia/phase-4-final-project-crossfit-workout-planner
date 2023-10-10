import React from "react";
import * as yup from "yup";
import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI,
  Button as ButtonUI,
  Segment
} from "semantic-ui-react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

function ClassScheduleForm({ title, formData, setFormData, refresh, setRefresh, moves }) {

  const history = useHistory()


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
    <Segment>
    <GridUI.Column width={5}>
      <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit ${formData.name}` : `Add a new ${title}`}</HeaderUI>
      
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
              enableReinitialize = { true }
              >
      
      {/* id : "",
      day: "",
      hour: "",
      coach: {id: "", name: ""},
      workout_plan: {id: "", name : "", difficulty : ""} */}

      { formik => (
        <FormUI onSubmit={formik.handleSubmit} >

          {/* WHY DOES THIS NEED TO BE A FIELD? IT COULD BE JUST AN HTML ELEMENT DISPLAYING OR NOT THE ID */}
          <FormUI.Field disabled>
            <label>ID</label>
            <FormUI.Input id="id" name="id" onChange={formik.handleChange} value={formik.values.id} />
          </FormUI.Field>
          <FormUI.Field>
            <label>Day: Should be a drop down</label>
            <FormUI.Input id="day" name="day" onChange={formik.handleChange} value={formik.values.day} />
          </FormUI.Field>
          <FormUI.Field>
            <label>Time: Should be a drop down</label>
            <FormUI.Input id="hour" name="hour" onChange={formik.handleChange} value={formik.values.hour} />
          </FormUI.Field>

          {/* <FormUI.Field as="select" onChange={formik.handleChange} name = {`exercise_moves.${index}.id`} value = {formik.values.exercise_moves[index].id}>
                          <option disabled value = "" label="Select Option"></option>
                          {moves.map ( exerMove => <option key = {exerMove.name} value={exerMove.id} label = {exerMove.name} ></option>)}
          </FormUI.Field> */}

          {/* <FormUI.Field as="select" onChange={formik.handleChange} name = {`exercise_moves.${index}.id`} value = {formik.values.exercise_moves[index].id}>
                          <option disabled value = "" label="Select Option"></option>
                          {moves.map ( exerMove => <option key = {exerMove.name} value={exerMove.id} label = {exerMove.name} ></option>)}
          </FormUI.Field> */}          

          <DividerUI />
          <br />
          {/* onChange={value => formik.setFieldValue(`exercise_moves[${index}].id`, value)} */}

        <FormUI.Button type="submit">Submit</FormUI.Button>
      
        <DividerUI />
        { formData.id === "" ? "" : <FormUI.Button type="button" onClick={clearForm}>Click to Clear and Add New</FormUI.Button> }

      </FormUI>
      )}
      </Formik>
    </GridUI.Column>
    </Segment>
  );
}

export default ClassScheduleForm