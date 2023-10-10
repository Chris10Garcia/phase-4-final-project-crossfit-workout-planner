import React, { useState } from "react";
import * as yup from "yup";
import {
  Segment as SegmentUI,
  Header as HeaderUI,
  Card as CardUI,
  Button as ButtonUI
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
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


  return (
    <SegmentUI>
      <HeaderUI>
        <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
        <ButtonUI onClick ={() => setDisplayButton(!displayButton)} >{ displayButton ? "Hide Form" : `Show Add New / Edit Form`}</ButtonUI>
      </HeaderUI>
      
      
      <CardUI.Group stackable doubling>
        {displayButton ? <ClassScheduleForm title= {title} formData = {formData} setFormData={setFormData} coaches = {coaches} plans = {plans} refresh={refresh} setRefresh ={setRefresh}/> : "" }
       { days.map(day => <ClassScheduleDetails key={day} day={day} sch_classes={sch_classes} refresh={refresh} setRefresh ={setRefresh} displayButton = {displayButton} setDisplayButton = {setDisplayButton} setFormData = {setFormData} formData={formData}/>) }
      </CardUI.Group>
    </SegmentUI>
  );
}

export default ClassSchedule