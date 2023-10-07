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

  return (
    <GridUI.Column width={5}>
      <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit ${formData.name}` : `Add a new ${title}`}</HeaderUI>
      {/* */}
      <Formik
              onSubmit={(data)=>console.log(data)} 
              initialValues={formData} 
              enableReinitalize = {true}
      >
      {formik => (
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

          <DividerUI />

          <FieldArray name = "exercise_moves">
            { ({ insert, remove, push } ) => (
              <div>
                { formik.values.exercise_moves.length > 0 && formik.values.exercise_moves.map ( (move, index) => (
                  <React.Fragment key = {index}> 
                  {/*  onChange = { value => formik.setFieldValue("exercise_moves", value)}*/}

                    {/* onChange={formik.handleChange}  */}
                    <FormUI.Field as="select" >
                          <option value = "" label="Select Option"></option>
                          <option value = {moves[0].id}>{moves[0].name}</option>
                        </FormUI.Field>
                    {/* <FormUI.Field as="select" onChange={formik.handleChange} >
                      <option value = "" label="Select Option"></option>
                      {moves.map( move => <option key = {move.name} value = {move.id} label={move.name} name={move.id} id={`exercise_moves.${move.id}`}/>)}
                    </FormUI.Field> */}

                    {/* <FormUI.Field>
                      <label>Exercise Move ID</label>
                      <FormUI.Input id={`exercise_moves.${index}.id`} name={`exercise_moves.${index}.id`} onChange={formik.handleChange} value={move.id} />
                    </FormUI.Field >
                      <FormUI.Field>
                      <label>Exercise Move Name</label>
                      <FormUI.Input id={`exercise_moves.${index}.name`} name={`exercise_moves.${index}.name`} onChange={formik.handleChange} value={move.name} />
                    </FormUI.Field > */}
                    <ButtonUI type = "button" className = "secondary" onClick={()=>remove(index)}>Remove Field</ButtonUI>
                  </React.Fragment>
                    )
                )}
                <ButtonUI type = "button" className = "secondary" onClick={()=>push({ id: "", name: "",focus: "", description: "", video_link: ""})}>Add Field</ButtonUI>
              </div>
            )}
          </FieldArray>

          


        {/* THIS NEEDS TO BE A DROP DOWN OF THE EXSITING EXERCISE MOVES */}        

        {/* <FormUI.Field>
          <label>Video Link</label>
          <FormUI.Input id="video_link" name="video_link" onChange={formik.handleChange} value={formik.values.video_link} />
        </FormUI.Field> */}
        <DividerUI />
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