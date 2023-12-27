import React, { useContext, useState } from "react";

import ClassScheduleDetails  from "./ClassScheduleDetails";
import ClassScheduleForm from "./ClassScheduleForm";

import {
  Segment as SegmentUI,
  Header as HeaderUI,
  Card as CardUI,
  Button as ButtonUI
} from 'semantic-ui-react';
import { CurrentUserContext } from "./App";




function ClassSchedule( { sch_classes, plans, coaches, refresh, setRefresh } ){
  const [displayButton, setDisplayButton] = useState(false)

  const { user } = useContext(CurrentUserContext)

  const clearFormValues = {
      id : "",
      day: "",
      hour: "",
      coach: {id: "", name: ""},
      workout_plan: {id: "", name : "", difficulty : ""}
    }

  const [formData, setFormData] = useState( clearFormValues )
  
  const title = "Class Schedule"
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


  return (
    <SegmentUI>
      <HeaderUI>
        <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
        { user ? <ButtonUI onClick ={() => setDisplayButton(!displayButton)} >{ displayButton ? "Hide Form" : `Show Add New / Edit Form`}</ButtonUI> : ""}
      </HeaderUI>
      
      <CardUI.Group stackable doubling>
        { displayButton ? <ClassScheduleForm 
                              title= {title} coaches = {coaches} plans = {plans} 
                              formData = {formData} setFormData={setFormData} 
                              refresh={refresh} setRefresh ={setRefresh} days={days} 
                              clearFormValues={clearFormValues} /> 
                        : "" }
        { days.map(day => <ClassScheduleDetails 
                              key={day} day={day} sch_classes={sch_classes} 
                              refresh={refresh} setRefresh ={setRefresh} 
                              displayButton = {displayButton} setDisplayButton = {setDisplayButton} 
                              setFormData = {setFormData} formData={formData}/> )}
      </CardUI.Group>
    </SegmentUI>
  );
}

export default ClassSchedule