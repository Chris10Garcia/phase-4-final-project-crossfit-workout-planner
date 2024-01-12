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
import { useHistory } from "react-router-dom";




function ClassSchedule( { sch_classes, plans, coaches, refresh, setRefresh } ){
  const [displayButton, setDisplayButton] = useState(false)

  const { user } = useContext(CurrentUserContext)

  const history = useHistory()
  const location = history.location.pathname

  let heading
  let user_classes = sch_classes

  if (location === "/schedules"){
    heading = <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
  } else {
    heading = <h2>Welcome Coach {user.name}, here are all of your classes you are teaching </h2>
    user_classes = sch_classes.filter(sch_class => sch_class.coach.id === user.id);
    console.log(user_classes)
  }


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
        { heading }
        { user && location === "/schedules" ? <ButtonUI onClick ={() => setDisplayButton(!displayButton)} >{ displayButton ? "Hide Form" : `Show Add New / Edit Form`}</ButtonUI> : ""}
      </HeaderUI>

      <CardUI.Group stackable doubling>
        { displayButton && location === "/schedules" ? <ClassScheduleForm 
                              title= {title} coaches = {coaches} plans = {plans} 
                              formData = {formData} setFormData={setFormData} 
                              refresh={refresh} setRefresh ={setRefresh} days={days} 
                              clearFormValues={clearFormValues} /> 
                        : "" }
        { days.map(day => <ClassScheduleDetails 
                              key={day} day={day} sch_classes={user_classes} 
                              refresh={refresh} setRefresh ={setRefresh} 
                              displayButton = {displayButton} setDisplayButton = {setDisplayButton} 
                              setFormData = {setFormData} formData={formData}/> )}
      </CardUI.Group>
    </SegmentUI>
  );
}

export default ClassSchedule