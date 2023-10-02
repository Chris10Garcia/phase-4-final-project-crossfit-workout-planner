import React, {useState} from "react";
import PageFrame from "./PageFrame";
import ExerciseMoveDetails from "./ExerciseMoveDetails";
import * as yup from "yup";

import {
  Grid as GridUI,
  Header as HeaderUI
} from "semantic-ui-react"
import { useFormik } from "formik";

function FormFrame(prop){
  const {title} = prop

  


  return(
    <GridUI.Column width = {5}>
      <HeaderUI as = "h2">Form to add a new {title}</HeaderUI>

    </GridUI.Column>
  )
}

function ExerciseMove({ moves }) {
  const title = "Exercise Move"
  const [formData, setFormData] = useState({
      name: "",
      focus: "",
      description: "",
      video_link: ""
  })

  const formSchema = yup.object().shape({
    name : yup.string(),
    focus : yup.string(),
    description : yup.string(),
    video_link : yup.string()
  })

  const formik = useFormik({
    initialValues : formData,
    onSubmit: values => {
      console.log(values)
    }

  })

  return (
    <PageFrame
      title = {title}
      dataList={moves}>
        {/* instead it should be here */}
      <FormFrame title= {title} />
      <ExerciseMoveDetails dataList={moves} />
      
    </PageFrame>
  );
}

export default ExerciseMove