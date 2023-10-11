import React from "react";
import {useHistory } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI
} from "semantic-ui-react";


function ExerciseMoveForm({ title, formData, setFormData, refresh, setRefresh, clearFormValues }) {
  const history = useHistory()

  const formSchema = yup.object().shape({
    // id: yup.number().integer(),
    name: yup.string(),
    focus: yup.string(),
    description: yup.string(),
    video_link: yup.string()
  });


  function submitData(values){
    if (values.id === ""){
      fetch("/exercise_moves", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(values)
      })
      .then( r => {
        if (r.ok){
          r.json().then(data => {
            setRefresh(!refresh)
            history.push(`${data.id}`)
          })
        } else {
          r.json().then( err => {
            console.log(err)
          })
        }
      })


    } else {
      fetch(`${values.id}`, {
        method : "PATCH",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify(values)
      })
      .then( r => {
        if (r.ok){
          r.json().then(data => {
            setRefresh(!refresh)
            
          })
        } else {
          r.json().then(err => console.log(err))
        }
      })
      
    }

    setFormData(values);
    formik.setValues(values);
  }

  const formik = useFormik({
    initialValues: formData,
    onSubmit: values => submitData(values),
    enableReinitialize: true,
  });

  function clearForm(){
    setFormData(clearFormValues)
  }

  return (
    <GridUI.Column width={5}>
      <HeaderUI as="h2">{ formData.id !== "" ? `Form to Edit ${formData.name}` : `Add a new ${title}`}</HeaderUI>
      <FormUI onSubmit={formik.handleSubmit}>

        <FormUI.Field disabled label = "ID" control="input" name="id" onChange={formik.handleChange} value={formik.values.id} />

        <FormUI.Field label="Name" control="input" name="name" onChange={formik.handleChange} value={formik.values.name}/>

        <FormUI.Field label="Focus" control="input" name="focus" onChange={formik.handleChange} value={formik.values.focus}/>

        <FormUI.Field label="Description" control="textarea" name="description" rows={4} onChange={formik.handleChange} value={formik.values.description}/>

        <FormUI.Field label="Video Link" control="input" name="video_link" onChange={formik.handleChange} value={formik.values.video_link}/>

        <FormUI.Button type="submit">Submit</FormUI.Button>
        <DividerUI />

        <FormUI.Button type="button" onClick={clearForm}>Clear Form</FormUI.Button>

      </FormUI>
    </GridUI.Column>
  );
}

export default ExerciseMoveForm