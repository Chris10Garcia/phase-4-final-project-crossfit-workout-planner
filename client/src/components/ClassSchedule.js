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


function ClassSchedule({ sch_classes, refresh, setRefresh, plans, coaches }) {
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
      
      <CardUI.Group stackable doubling>
        {displayButton ? <ClassScheduleForm title= {title} formData = {formData} setFormData={setFormData} coaches = {coaches} plans = {plans} refresh={refresh} setRefresh ={setRefresh}/> : "" }
       { [...days].map(day => <ClassScheduleDetails key={day} day={day} sch_classes={sch_classes}  refresh={refresh} displayButton = {displayButton} setDisplayButton = {setDisplayButton} setFormData = {setFormData}/>) }
      </CardUI.Group>
    </SegmentUI>
  );
}

export default ClassSchedule