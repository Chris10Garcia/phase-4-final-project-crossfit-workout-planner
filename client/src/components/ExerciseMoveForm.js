import React, { useContext, useState } from "react";
import {useHistory } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI
} from "semantic-ui-react";
import { SocketContext } from "./App";


function ExerciseMoveForm({ title, formData, setFormData, refresh, setRefresh, clearFormValues }) {
  const history = useHistory()
  const socket = useContext(SocketContext)

  // for all forms i need to add this
  const [apiError, setApiError] = useState({})  

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
      socket.emit("new_exercise_moves", values, result => {
        if (result.ok){
            setRefresh(!refresh)
            history.push(`/exercise_moves/${result.data.id}` )
            setFormData(result.data)
            setApiError({})   // for all forms i need to add this          
        } else {
          setApiError(result.errors)
        }
        })
      
    } else {
      socket.emit("update_exercise_move", values, result => {
        if (result.ok){
            setRefresh(!refresh)
            history.push(`/exercise_moves/${result.data.id}` )
            setFormData(result.data)
            setApiError({})   // for all forms i need to add this          
        } else {
          setApiError(result.errors)
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
    validationSchema: formSchema
  });

  function clearForm(){
    setFormData(clearFormValues)
    setApiError({})
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
        <b><p style={{color: "red"}}>{apiError.errors}</p></b>
        <DividerUI />

        <FormUI.Button type="button" onClick={clearForm}>Clear Form</FormUI.Button>

      </FormUI>
    </GridUI.Column>
  );
}

export default ExerciseMoveForm