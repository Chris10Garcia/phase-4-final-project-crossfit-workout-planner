import React from "react";
import { Link } from "react-router-dom"

import {
  Header as HeaderUI,
  Card as CardUI,
  Feed as FeedUI,
  Divider as DividerUI,
  Button as ButtonUI
} from 'semantic-ui-react';

function ClassScheduleDetails({ day, sch_classes, setDisplayButton, setFormData, refresh, setRefresh, formData }) {

  const classesFiltered = sch_classes.filter(sch_classes => day === sch_classes.day);

  classesFiltered.sort (( a,b ) => a.hour - b.hour)

  function editButton(class_detail){
    setDisplayButton(true)  
    setFormData(class_detail)
  }

  function deleteButton(class_detail){
    fetch(`/schedules/${class_detail.id}`, {
      method: "DELETE",
      headers: {"Content-Type" : "application/json"},
    })
    .then(r => r.json())
    .then(d => setRefresh(!refresh))
    .catch(err => console.log(err))
    setFormData({
      id : "",
      day: "",
      hour: "",
      coach: {id: "", name: ""},
      workout_plan: {id: "", name : "", difficulty : ""}
    })
  }

  const feedClassesContentJSX = classesFiltered.map(class_details => {
    return (
      <div key={class_details.id} style={ formData.id === class_details.id ? {backgroundColor: "LightGray"} : {}} >
        <FeedUI.Event >
          <FeedUI.Content >
            
            <HeaderUI as="h4">Workout Plan: <Link to ={`/workout_plans/${class_details.workout_plan.id}`}>{class_details.workout_plan.name} </Link></HeaderUI>
            
            <FeedUI.Meta>
              Class ID: {class_details.id}
              <br />
              Difficulty: {class_details.workout_plan.difficulty} 
            </FeedUI.Meta>   
            
            <FeedUI.Summary>Time: {class_details.hour}</FeedUI.Summary>
            <p>Coach: <FeedUI.User as={Link} to={`/coaches/${class_details.coach.id}`}>{class_details.coach.name} </FeedUI.User></p>
            
            <FeedUI.Extra>  
              <ButtonUI onClick={()=>editButton(class_details)} size="mini">Edit</ButtonUI>
              <ButtonUI onClick={()=>deleteButton(class_details)} size="mini">Delete</ButtonUI>
            </FeedUI.Extra>

          </FeedUI.Content>

        </FeedUI.Event>
        <DividerUI />
      </div>
    );
  });

  return (
    
    <CardUI style={ feedClassesContentJSX.length > 0 ? {"verticalAlign" : "top", "display": "inline-block"} : {"display":"none"}} >
      <CardUI.Content>
        <CardUI.Header as="h1">{day} </CardUI.Header>
      </CardUI.Content>
      
      <CardUI.Content >
        <FeedUI > 
          {feedClassesContentJSX}
        </FeedUI>
      </CardUI.Content>
    </CardUI>
  );
}

export default ClassScheduleDetails