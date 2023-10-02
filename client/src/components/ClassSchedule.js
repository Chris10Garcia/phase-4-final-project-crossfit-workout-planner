import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Segment as SegmentUI,
  Header as HeaderUI,
  Card as CardUI,
  Form as FormUI,
} from 'semantic-ui-react';

import ClassScheduleDetails  from "./ClassScheduleDetails";

/*
day, hour, coach_id / coach, workout_plan_id / workout_plan
*/

function FormClassSchedule(){
  const formSchema = yup.object().shape({
    day: yup.string().required(),
    hour: yup.string(),
    coach_id: yup.number().integer(),
    workout_plan_id: yup.number().integer(),
  });

  const formik = useFormik({
    initialValues: {
      day: "",
      hour: "",

      coach_id: "",
      workout_plan_id: "",
    },
    validationSchema: formSchema,
    onSubmit: values =>{
      console.log(values)
    }
  })

  return(
    <SegmentUI>
    <FormUI onSubmit = {formik.handleSubmit}>
      <FormUI.Field>
        <label htmlFor="day">Day</label>
        <br />
        <input 
          id = "day"
          name = "day"
          onChange = {formik.handleChange}
          value = {formik.values.day}
        />
        <p style={{color: "red"}}>{formik.errors.hour}</p>
      </FormUI.Field>
    </FormUI>
    </SegmentUI>
  )
}


function ClassSchedule({ sch_classes }) {
  const days = new Set();

  sch_classes.forEach(element => days.add(element.day));

  const classDetailsJSX = [...days].map(day => <ClassScheduleDetails key={day} day={day} sch_classes={sch_classes} />);

  return (
    <SegmentUI>
      <HeaderUI>
        <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
      </HeaderUI>
      <CardUI.Group>
        {classDetailsJSX}
        <FormClassSchedule />
      </CardUI.Group>
    </SegmentUI>
  );
}

export default ClassSchedule