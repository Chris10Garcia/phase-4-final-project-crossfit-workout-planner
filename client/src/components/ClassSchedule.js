import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Segment as SegmentUI,
  Header as HeaderUI,
  Card as CardUI,
  Form as FormUI,
} from 'semantic-ui-react';

import ClassScheduleDetails  from "./ClassScheduleDetails";
import ClassScheduleForm from "./ClassScheduleForm";

/*
day, hour, coach_id / coach, workout_plan_id / workout_plan
*/


/* 
  Copy WorkoutPlanForm
  Edit the attrs and varriables
  It will need a single selection of a coach
  it will need a single selection of a workout plan

*/

function ClassSchedule({ sch_classes, refresh, setRefresh }) {
  const [displayButton, setDisplayButton] = useState(false)
  const title = "Class Schedule"
  const [formData, setFormData] = useState( {
    id : "",
    day: "",
    hour: "",
    coach: {id: "", name: ""},
    workout_plan: {id: "", name : "", difficulty : ""}
  }
  )

  const days = new Set();

  sch_classes.forEach(element => days.add(element.day));


  return (
    <SegmentUI>
      <HeaderUI>
        <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
      </HeaderUI>
      
      <CardUI.Group>
        {displayButton ? <ClassScheduleForm title= {title} formData = {formData} setFormData={setFormData} refresh={refresh} setRefresh ={setRefresh}/> : "" }
       { [...days].map(day => <ClassScheduleDetails key={day} day={day} sch_classes={sch_classes} displayButton = {displayButton} setDisplayButton = {setDisplayButton} setFormData = {setFormData}/>) }
      </CardUI.Group>
    </SegmentUI>
  );
}

export default ClassSchedule