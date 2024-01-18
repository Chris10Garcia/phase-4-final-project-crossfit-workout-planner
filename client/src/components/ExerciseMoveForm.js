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
    name: yup.string()
      .min(2, "Name is too short")
      .max(30, "Name is too long")
      .required("Name is require")
    ,
    focus: yup.string()
      .min(2, "Focus type is too short")
      .max(30, "Focus type is too long")
      .required("A focus type is require")
    ,
    description: yup.string()      
      .min(10, "Description is too short")
      .max(500, "Description is too long")
      .required("A description is require")
    ,
    video_link: yup.string()
      .url("Please provide a proper url for the video (https://www.website.com)")
    ,
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
            history.push(`/exercise_moves/${data.id}` )
            setFormData(data)
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
    // validationSchema: formSchema
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
        <b><p style={{color: "red"}}>{formik.errors.name}</p></b>

        <FormUI.Field label="Focus" control="input" name="focus" onChange={formik.handleChange} value={formik.values.focus}/>
        <b><p style={{color: "red"}}>{formik.errors.focus}</p></b>

        <FormUI.Field label="Description" control="textarea" name="description" rows={4} onChange={formik.handleChange} value={formik.values.description}/>
        <b><p style={{color: "red"}}>{formik.errors.description}</p></b>

        <FormUI.Field label="Video Link" control="input" name="video_link" onChange={formik.handleChange} value={formik.values.video_link}/>
        <b><p style={{color: "red"}}>{formik.errors.video_link}</p></b>

        <FormUI.Button type="submit">Submit</FormUI.Button>
        <DividerUI />

        <FormUI.Button type="button" onClick={clearForm}>Clear Form</FormUI.Button>

      </FormUI>
    </GridUI.Column>
  );
}

export default ExerciseMoveForm