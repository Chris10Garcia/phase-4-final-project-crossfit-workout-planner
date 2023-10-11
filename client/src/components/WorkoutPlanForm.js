import React from "react";
import * as yup from "yup";
import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI,
  Button as ButtonUI
} from "semantic-ui-react";
import { FieldArray, Formik } from "formik";
import { useHistory } from "react-router-dom";

function WorkoutPlanForm({ title, formData, setFormData, refresh, setRefresh, moves, clearFormValues }) {

  const history = useHistory()

  // REDO THIS
  const formSchema = yup.object().shape({
    // id: yup.number().integer(),
    name: yup.string(),
    focus: yup.string(),
    description: yup.string(),
    video_link: yup.string()
  });

  function clearForm(){
    setFormData(clearFormValues)  
  }

  function submitData(data){
    if (data.id === ""){
      fetch("/workout_plans", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
      })
      .then ( r => {
        if (r.ok){
          r.json().then(data => {
              setRefresh(!refresh)
              history.push(`${data.id}`)
          })
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
  }

  return (
    <GridUI.Column width={5}>
      <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit ${formData.name}` : `Add a new ${title}`}</HeaderUI>
      
      <Formik onSubmit={(data)=> submitData(data)} initialValues={formData} enableReinitialize = { true } >
      
        { formik => (
          <FormUI onSubmit={formik.handleSubmit} >

            <FormUI.Field disabled label = "ID" control="input" name="id" onChange={formik.handleChange} value={formik.values.id} />

            <FormUI.Field label="Name" control="input" name="name" onChange={formik.handleChange} value={formik.values.name}/>
            
            <FormUI.Field label="Difficulty" control="input" name="difficulty" onChange={formik.handleChange} value={formik.values.difficulty}/>

            <FormUI.Field label="Description" control="textarea" name="description" rows={4} onChange={formik.handleChange} value={formik.values.description}/>
       
            <DividerUI />
            <b>Select as many exercise moves to include within the workout plan</b>
            <br />

            <FieldArray name = "exercise_moves" >
              { ( { remove, push } ) => (

                <div>
                  { formik.values.exercise_moves.length > 0 && formik.values.exercise_moves.map ( (move, index) => (
                      <React.Fragment key = {index} > 

                        <FormUI.Field as="select" onChange={formik.handleChange} name = {`exercise_moves.${index}.id`} value = {formik.values.exercise_moves[index].id}>
                            <option disabled value = "" label="Select Option" />
                            {moves.map ( exerMove => <option value={exerMove.id} label = {exerMove.name} key = {exerMove.name} /> )}
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
          { formData.id === ""  ? "" 
                                : <FormUI.Button type="button" onClick={clearForm}>Click to Clear and Add New</FormUI.Button> }

          </FormUI>
        )}

      </Formik>
    </GridUI.Column>
  );
}

export default WorkoutPlanForm