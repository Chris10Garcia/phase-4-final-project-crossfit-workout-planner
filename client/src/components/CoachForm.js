import React from "react";
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
  }

  return (
    <GridUI.Column width={5}>
      <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit Coach ${formData.name}` : `Add a new ${title}`}</HeaderUI>
      <FormUI onSubmit={formik.handleSubmit}>

        <FormUI.Field disabled label = "ID" control="input" name="id" onChange={formik.handleChange} value={formik.values.id} />

        <FormUI.Field label="Name" control="input" type="text" name="name" onChange={formik.handleChange} value={formik.values.name}/>
        <p style={{color: "red"}}>{formik.errors.name}</p>
 
        <FormUI.Field label="Age" control="input" name="age" onChange={formik.handleChange} value={formik.values.age}/>
        <p style={{color: "red"}}>{formik.errors.age}</p>

        <FormUI.Field label="Picture" control="input" type="url" name="picture" onChange={formik.handleChange} value={formik.values.picture}/>
        <p style={{color: "red"}}>{formik.errors.picture}</p>

        <FormUI.Button type="submit">Submit</FormUI.Button>
        <DividerUI />

        <FormUI.Button type="button" onClick={clearForm}>Clear Form</FormUI.Button>
      </FormUI>

    </GridUI.Column>
  );
}

export default CoachForm