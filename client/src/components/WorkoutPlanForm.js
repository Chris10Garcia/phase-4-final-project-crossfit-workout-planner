import React, { useContext, useState } from "react";
import * as yup from "yup";
import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI,
  Button as ButtonUI
} from "semantic-ui-react";
import { FieldArray, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { SocketContext } from "./App";

function WorkoutPlanForm({ title, formData, setFormData, refresh, setRefresh, moves, clearFormValues }) {
  const socket = useContext(SocketContext)

  const history = useHistory()

  const [apiError, setApiError] = useState({})

  const formSchema = yup.object().shape({
    name: yup.string()
      .min(2, "Name is too short")
      .max(40, "Name is too long")
      .required("Name is require")
    ,
    description: yup.string()      
      .min(10, "Description is too short")
      .max(300, "Description is too long")
      .required("A description is require")
    ,
    difficulty: yup.string()
      .min(2, "Difficulty type is too short")
      .max(20, "Difficulty type is too long")
      .required("A difficulty is require")
    ,
    exercise_moves : yup.array()
      .of( yup.object().shape( {id: yup.string().required("Must select an exercise move or press 'remove field'")} ) )
      .min(1, "Must add a workout move to the plan")

  });


  function clearForm(){
    setFormData(clearFormValues)  
  }

  function submitData(values){

    if (values.id === ""){
      socket.emit("new_workout_plan", values, result => {
        if (result.ok) {
          setRefresh(!refresh)
          history.push(`/workout_plans/${result.data.id}`)
          setFormData(result.data)
          setApiError({})
      } else {
          setApiError(result.errors)
      }
      })

    } else {

      socket.emit("update_workout_plan", values, result =>{
        if (result.ok) {
          setRefresh(!refresh)
          history.push(`/workout_plans/${result.data.id}`)
          setFormData(result.data)
          setApiError({})
      } else {
          setApiError(result.errors)
      }
      })               
    }
  }


  return (
    <GridUI.Column width={5}>
      <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit ${formData.name}` : `Add a new ${title}`}</HeaderUI>
      
      <Formik onSubmit={(data)=> submitData(data)} initialValues={formData} enableReinitialize = { true } validationSchema={formSchema} >
      {/* <Formik onSubmit={(data)=> submitData(data)} initialValues={formData} enableReinitialize = { true }> */}
        { formik => (
          <FormUI onSubmit={formik.handleSubmit} >
            {}

            <FormUI.Field disabled label = "ID" control="input" name="id" onChange={formik.handleChange} value={formik.values.id} />

            <FormUI.Field label="Name" control="input" name="name" onChange={formik.handleChange} value={formik.values.name}/>
            <b><p style={{color: "red"}}>{formik.errors.name}</p></b>

            <FormUI.Field label="Difficulty" control="input" name="difficulty" onChange={formik.handleChange} value={formik.values.difficulty}/>
            <b><p style={{color: "red"}}>{formik.errors.difficulty}</p></b>
            
            <FormUI.Field label="Description" control="textarea" name="description" rows={4} onChange={formik.handleChange} value={formik.values.description}/>
            <b><p style={{color: "red"}}>{formik.errors.description}</p></b>

            <DividerUI />
            <b>Select as many exercise moves to include within the workout plan</b>
            <br />
            { typeof formik.errors.exercise_moves === "string" ? <b><p style={{color: "red"}}>{formik.errors.exercise_moves}</p></b> : ""}
   
            <FieldArray name = "exercise_moves" >
              { ( { remove, push } ) => (

                <div>
                  { formik.values.exercise_moves.length > 0 && formik.values.exercise_moves.map ( (move, index) => (
                      <React.Fragment key = {index} > 

                        <FormUI.Field as="select" onChange={formik.handleChange} name = {`exercise_moves.${index}.id`} value = {formik.values.exercise_moves[index].id}>
                            <option value = "" label="Select Option" />
                            {moves.map ( exerMove => <option value={exerMove.id} label = {exerMove.name} key = {exerMove.name} /> )}
                        </FormUI.Field>
      
                        { typeof formik.errors.exercise_moves === "object" && formik.errors.exercise_moves.length > 0 
                                          ? <b><p style={{color: "red"}}>{ formik.errors.exercise_moves[index] === undefined ? "" : formik.errors.exercise_moves[index].id }</p></b> 
                                          : ""}
                                          
                        <ButtonUI type = "button" className = "secondary" onClick={()=>remove(index)}>Remove Field</ButtonUI>
                        <br />
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
          <b><p style={{color: "red"}}>{apiError.errors}</p></b>
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