import React, { useContext, useState } from "react";

import ClassScheduleDetails  from "./ClassScheduleDetails";

import {
  Segment as SegmentUI,
  Header as HeaderUI,
  Card as CardUI,
  Button as ButtonUI
} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";


function HomePageClassSchedule( { sch_classes, refresh, setRefresh } ){
  const [displayButton, setDisplayButton] = useState(false)

  const history = useHistory()
  const location = history.location.pathname

  // let heading

  // if (location === "/schedules"){
  //   console.log(location)
  //   heading = <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
  // } else {
  //   heading = <h2>Here are all of your classes you are teaching Coach {user.name}</h2>
  // }

  const clearFormValues = {
      id : "",
      day: "",
      hour: "",
      coach: {id: "", name: ""},
      workout_plan: {id: "", name : "", difficulty : ""}
    }

  const [formData, setFormData] = useState( clearFormValues )
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


  return (
    <SegmentUI>
      <HeaderUI>
        <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
      </HeaderUI>
      
      <CardUI.Group stackable doubling>
        { days.map(day => <ClassScheduleDetails 
                              key={day} day={day} sch_classes={sch_classes} 
                              refresh={refresh} setRefresh ={setRefresh} 
                              displayButton = {displayButton} setDisplayButton = {setDisplayButton} 
                              setFormData = {setFormData} formData={formData}/> )}
      </CardUI.Group>
    </SegmentUI>
  );
}

export default HomePageClassSchedule