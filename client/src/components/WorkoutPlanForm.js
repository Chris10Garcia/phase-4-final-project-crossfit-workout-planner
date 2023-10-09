import React from "react";
import * as yup from "yup";
import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI,
  Button as ButtonUI
} from "semantic-ui-react";
import { FieldArray, Formik, useFormik } from "formik";

function WorkoutPlanForm({ title, formData, setFormData, refresh, setRefresh, moves }) {

  
  // REDO THIS
  const formSchema = yup.object().shape({
    // id: yup.number().integer(),
    name: yup.string(),
    focus: yup.string(),
    description: yup.string(),
    video_link: yup.string()
  });



  // REDO THIS
  // const formik = useFormik({
  //   initialValues: formData,

  //   onSubmit: values => {
  //     if (values.id === ""){

  //       console.log("POST REQUEST")
  //       console.log(values)
  //     //   fetch("/exercise_moves", {
  //     //     method: "POST",
  //     //     headers: {"Content-Type" : "application/json"},
  //     //     body: JSON.stringify(values)
  //     //   })
  //     //   .then( r => {
  //     //     if (r.ok){
  //     //       r.json().then(data => {
  //     //         setRefresh(!refresh)
  //     //       })
  //     //     } else {
  //     //       r.json().then( err => {
  //     //         console.log(err)
  //     //       })
  //     //     }
  //     //   })


  //     } else {
  //       console.log("PATCH REQUEST")
  //       console.log(values)
  //       // fetch(`${values.id}`, {
  //       //   method : "PATCH",
  //       //   headers : { "Content-Type" : "application/json"},
  //       //   body : JSON.stringify(values)
  //       // })
  //       // .then( r => {
  //       //   if (r.ok){
  //       //     r.json().then(data => {
  //       //       setRefresh(!refresh)
  //       //       // history.push(`${data.id}`)
  //       //     })
  //       //   } else {
  //       //     r.json().then(err => console.log(err))
  //       //   }
  //       // })
        
  //     }

  //     setFormData({ ...values });
  //     formik.setValues(values);
  //   },

  //   enableReinitialize: true,
  // });


  function clearForm(){
    setFormData({
          id: "",
          name: "",
          difficulty: "",
          description: "",
          exercise_moves: [{
            id: "",
        }]
      })  
  }

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
    <GridUI.Column width={5}>
      <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit ${formData.name}` : `Add a new ${title}`}</HeaderUI>
      
      <Formik
              onSubmit={(data)=>{
                helperClearAttrs(data)
                
                if (data.id === ""){
                  fetch("/workout_plans", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(data)
                  })
                  .then ( r => {
                    if (r.ok){
                      r.json().then(data => setRefresh(!refresh))
                    } else {
                      r.json().then(err => console.log(err))
                    }
                  })

                } else {
                  
                  fetch(`${data.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(data)
                  })
                  .then ( r => {
                    if (r.ok){
                      r.json().then(data => setRefresh(!refresh))
                    } else {
                      r.json().then(err => console.log(err))
                    }
                  })                  

                }
              }}
              initialValues={formData} 
              enableReinitialize = { true }
              >
      
      { formik => (
        <FormUI onSubmit={formik.handleSubmit} >

          {/* WHY DOES THIS NEED TO BE A FIELD? IT COULD BE JUST AN HTML ELEMENT DISPLAYING OR NOT THE ID */}
          <FormUI.Field disabled>
            <label>ID</label>
            <FormUI.Input id="id" name="id" onChange={formik.handleChange} value={formik.values.id} />
          </FormUI.Field>
          <FormUI.Field>
            <label>Name</label>
            <FormUI.Input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
          </FormUI.Field>
          <FormUI.Field>
            <label>Difficulty</label>
            <FormUI.Input id="difficulty" name="difficulty" onChange={formik.handleChange} value={formik.values.difficulty} />
          </FormUI.Field>
          <FormUI.Field>
            <label>Description</label>
            <FormUI.Input id="description" name="description" onChange={formik.handleChange} value={formik.values.description} />
          </FormUI.Field>

          <DividerUI />
          Select as many exercise moves to include within the workout plan
          <br />
          {/* onChange={value => formik.setFieldValue(`exercise_moves[${index}].id`, value)} */}

          <FieldArray name = "exercise_moves">
            { ({ insert, remove, push } ) => (
              <div>
                { formik.values.exercise_moves.length > 0 && formik.values.exercise_moves.map ( (move, index) => (
                  <React.Fragment key = {index}> 
                    <FormUI.Field as="select" onChange={formik.handleChange} name = {`exercise_moves.${index}.id`} value = {formik.values.exercise_moves[index].id}>
                          <option value = "" label="Select Option"></option>
                          {moves.map ( exerMove => <option key = {exerMove.name} value={exerMove.id} label = {exerMove.name} ></option>)}
                        </FormUI.Field>
                    <ButtonUI type = "button" className = "secondary" onClick={()=>remove(index)}>Remove Field</ButtonUI>
                    <br />
                    <br />
                  </React.Fragment>
                    )
                )}
                <ButtonUI type = "button" onClick={()=>push({ id: ""})}>Add Field</ButtonUI>
              </div>
            )}
          </FieldArray>

        <DividerUI />
        <FormUI.Button type="submit">Submit</FormUI.Button>
      
        <DividerUI />
        <FormUI.Button type="button" onClick={clearForm}>Clear Form</FormUI.Button>


      </FormUI>
      )}

        

      </Formik>


    </GridUI.Column>
  );
}

export default WorkoutPlanForm