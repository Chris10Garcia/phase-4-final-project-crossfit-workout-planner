import React, { useState } from "react";
import {useHistory } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI
} from "semantic-ui-react";


function CoachForm({ title, formData, setFormData, refresh, setRefresh, clearFormValues }) {
  const history = useHistory()

  const [apiError, setApiError] = useState({}) 

  const formSchema = yup.object().shape({
    name: yup.string()
      .min(2, "Name is too short")
      .max(40, "Name is too long")
      .required("Name is require")
      ,
    age: yup.number()
      .integer("Age must be an integer number")
      .min(18, "You must be at least 18 years old")
      ,
    picture: yup.string()
      .url("Please provide a proper url for the picture")
      ,
    
  });

  function submitData(values){

    if (values.id === ""){
      fetch("/coaches", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(values)
      })
      .then( r => {
        if (r.ok){
          r.json().then(data => {
            setRefresh(!refresh)
            history.push(`/coaches/${data.id}`)
            setFormData(data)
            setApiError({})
          })
        } else {
          r.json().then( err => {
            setApiError(err)
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
            setApiError({})
          })
        } else {
          r.json().then(err => {
            setApiError(err)})
        }
      })
    }
    setFormData({ ...values });
    formik.setValues(values);
  }

  const formik = useFormik({
    initialValues: formData,
    onSubmit: values => submitData(values),
    enableReinitialize: true,
    validationSchema: formSchema
  });

  function clearForm(){
    setFormData(clearFormValues)
    setApiError({})
  }

  return (
    <GridUI.Column width={5}>
      <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit Coach ${formData.name}` : `Add a new ${title}`}</HeaderUI>
      <FormUI onSubmit={formik.handleSubmit}>

        <FormUI.Field disabled label = "ID" control="input" name="id" onChange={formik.handleChange} value={formik.values.id} />

        <FormUI.Field label="Name" control="input" type="text" name="name" onChange={formik.handleChange} value={formik.values.name}/>
        <b><p style={{color: "red"}}>{formik.errors.name}</p></b>
 
        <FormUI.Field label="Age" control="input" name="age" onChange={formik.handleChange} value={formik.values.age}/>
        <b><p style={{color: "red"}}>{formik.errors.age}</p></b>

        <FormUI.Field label="Picture" control="input" type="url" name="picture" onChange={formik.handleChange} value={formik.values.picture}/>
        <b><p style={{color: "red"}}>{formik.errors.picture}</p></b>

        <FormUI.Button type="submit">Submit</FormUI.Button>
        <b><p style={{color: "red"}}>{apiError.errors}</p></b>
        <DividerUI />

        <FormUI.Button type="button" onClick={clearForm}>Clear Form</FormUI.Button>
      </FormUI>

    </GridUI.Column>
  );
}

export default CoachForm