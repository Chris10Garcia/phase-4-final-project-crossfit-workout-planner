import React from "react";
import {useHistory } from "react-router-dom"
import * as yup from "yup";
import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI
} from "semantic-ui-react";
import { useFormik } from "formik";

function CoachForm({ title, formData, setFormData, refresh, setRefresh }) {
  const history = useHistory()
  const formSchema = yup.object().shape({
    // id: yup.number().integer(),
    name: yup.string(),
    focus: yup.string(),
    description: yup.string(),
    video_link: yup.string()
  });

  const formik = useFormik({
    initialValues: formData,
    onSubmit: values => {
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
    },
    enableReinitialize: true,
  });

  function clearForm(){
    setFormData({
      id: "",
      name: "",
      age: "",
      picture: "",
  })
  }

  return (
    <GridUI.Column width={5}>
      <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit Coach ${formData.name}` : `Add a new ${title}`}</HeaderUI>
      <FormUI onSubmit={formik.handleSubmit}>

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
          <label>Age</label>
          <FormUI.Input id="age" name="age" onChange={formik.handleChange} value={formik.values.age} />
        </FormUI.Field>
        <FormUI.Field>
          <label>Picture</label>
          <FormUI.Input id="picture" name="picture" onChange={formik.handleChange} value={formik.values.picture} />
        </FormUI.Field>
        <FormUI.Button type="submit">Submit</FormUI.Button>
        {/* <FormUI.Button type="reset" onClick={() => formik.resetForm()}>Reset to Original</FormUI.Button> */}
        <DividerUI />
        <FormUI.Button type="button" onClick={clearForm}>Clear Form</FormUI.Button>
      </FormUI>


    </GridUI.Column>
  );
}

export default CoachForm