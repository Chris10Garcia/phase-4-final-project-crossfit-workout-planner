import React from "react";
import * as yup from "yup";
import {
  Grid as GridUI,
  Header as HeaderUI,
  Form as FormUI, Divider as DividerUI
} from "semantic-ui-react";
import { useFormik } from "formik";

function FormExerciseMove({ title, formData, setFormData }) {


  const formSchema = yup.object().shape({
    id: yup.number().integer(),
    name: yup.string(),
    focus: yup.string(),
    description: yup.string(),
    video_link: yup.string()
  });



  // console.log(formData)
  const formik = useFormik({
    //   initialValues : {
    //     id: "",
    //     name: "",
    //     focus: "",
    //     description: "",
    //     video_link: ""
    // },
    initialValues: formData,
    onSubmit: values => {
      setFormData({ ...values });
      formik.setValues(values);
      console.log(formik.values);
    },
    enableReinitialize: true,
    // onReset: ()=> {
    //   setFormData({
    //     id: "",
    //     name: "",
    //     focus: "",
    //     description: "",
    //     video_link: ""
    // })
    //   console.log(formData)
    // }
  });



  return (
    <GridUI.Column width={5}>
      <HeaderUI as="h2">{formData.id !== "" ? `Form to Edit ${formData.name}` : `Add a new ${title}`}</HeaderUI>
      <FormUI onSubmit={formik.handleSubmit}>
        <FormUI.Field disabled>
          <label>ID</label>
          <FormUI.Input id="id" name="id" onChange={formik.handleChange} value={formik.values.id} />
        </FormUI.Field>
        <FormUI.Field>
          <label>Name</label>
          <FormUI.Input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
        </FormUI.Field>
        <FormUI.Field>
          <label>Focus</label>
          <FormUI.Input id="focus" name="focus" onChange={formik.handleChange} value={formik.values.focus} />
        </FormUI.Field>
        <FormUI.Field>
          <label>Description</label>
          <FormUI.TextArea rows={2} id="description" name="description" onChange={formik.handleChange} value={formik.values.description} />
        </FormUI.Field>
        <FormUI.Field>
          <label>Video Link</label>
          <FormUI.Input id="video_link" name="video_link" onChange={formik.handleChange} value={formik.values.video_link} />
        </FormUI.Field>
        <FormUI.Button type="submit">Submit</FormUI.Button>
        <DividerUI />
        <FormUI.Button type="reset" onClick={() => formik.resetForm()}>Reset to Original</FormUI.Button>
      </FormUI>


    </GridUI.Column>
  );
}

export default FormExerciseMove