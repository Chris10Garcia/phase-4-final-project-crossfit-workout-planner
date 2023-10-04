import React, {useState} from "react";
import PageFrame from "./PageFrame";
import ExerciseMoveDetails from "./ExerciseMoveDetails";
import * as yup from "yup";

import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI,
  Button as ButtonUI,
  TextArea as TextAreaUI,
  Divider as DividerUI
} from "semantic-ui-react"
import { useFormik } from "formik";



function FormExerciseMove({title, formData, setFormData, resetFormData }){


  const formSchema = yup.object().shape({
    id : yup.number().integer(),
    name : yup.string(),
    focus : yup.string(),
    description : yup.string(),
    video_link : yup.string()
  })


  const formik = useFormik({
    initialValues : formData,
    onSubmit: values => {
      setFormData({...values})
      console.log(values)
    },
    setFieldValue : formData,
    enableReinitialize: true
  })

  function DisplayID(idValue){
    if (idValue !== undefined){
      return (
      <FormUI.Field disabled>
        <label>ID</label>
        <FormUI.Input id = "id" name = "id" onChange={formik.handleChange} value = {formik.values.id}/>
      </FormUI.Field>
      )
    } else {
      return (<></>)
    }
  }


  return(
    <GridUI.Column width = {5}>
      <HeaderUI as = "h2">Form to add a new {title}</HeaderUI>
      <FormUI onSubmit = {formik.handleSubmit}>
        <DisplayID idValue = {formik.values.id} />
        <FormUI.Field>
          <label>Name</label>
          <FormUI.Input id = "name" name = "name" onChange={formik.handleChange} value = {formik.values.name} />
        </FormUI.Field>
        <FormUI.Field>
          <label>Focus</label>
          <FormUI.Input id = "focus" name = "focus" onChange={formik.handleChange} value = {formik.values.focus} />
        </FormUI.Field>
        <FormUI.Field>
          <label>Description</label>
          <FormUI.TextArea rows = {2} id = "description" name = "description" onChange={formik.handleChange} value = {formik.values.description}/>
        </FormUI.Field>
        <FormUI.Field >
          <label>Video Link</label>
          <FormUI.Input id = "video_link" name = "video_link" onChange={formik.handleChange} value = {formik.values.video_link}  />
        </FormUI.Field>
        <FormUI.Button type="submit">Submit</FormUI.Button>
        <DividerUI />
        <FormUI.Button type="reset" onClick={() => formik.resetForm({
            values: {
              id: undefined,
              name: "",
              focus: "",
              description: "",
              video_link: ""
          }
})}>Clear Form</FormUI.Button>
      </FormUI>

    </GridUI.Column>
  )
}






function ExerciseMove({ moves }) {
  const title = "Exercise Move"

  const startingValues = {
    id: undefined,
    name: "",
    focus: "",
    description: "",
    video_link: ""
}
  const [displayButton, setDisplayButton] = useState(false)
  const [formData, setFormData] = useState(startingValues)

  function resetFormData(){
    setFormData({...startingValues})    
  }

  function editButton(id){
    const move = moves.find( obj => obj.id === parseInt(id, 10))
    setDisplayButton(true)
    setFormData({...move})    
  }

  return (
    <PageFrame
      title = {title}
      dataList={moves}>
      {displayButton ? <FormExerciseMove title= {title} formData = {formData} setFormData={setFormData} /> : "" }
      <ExerciseMoveDetails dataList={moves} editButton={editButton} resetFormData={resetFormData} setDisplayButton={setDisplayButton} displayButton={displayButton}/>
      
    </PageFrame>
  );
}

export default ExerciseMove