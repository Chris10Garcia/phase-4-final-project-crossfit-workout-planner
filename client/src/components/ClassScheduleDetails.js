import React, { useContext } from "react";
import { Link } from "react-router-dom"

import {
  Header as HeaderUI,
  Card as CardUI,
  Feed as FeedUI,
  Divider as DividerUI,
  Button as ButtonUI
} from 'semantic-ui-react';
import { CurrentUserContext, SocketContext } from "./App";
import { useHistory } from "react-router-dom";

function ClassScheduleDetails({ day, sch_classes, setDisplayButton, setFormData, refresh, setRefresh, formData }) {
  const {user} = useContext(CurrentUserContext)

  const socket = useContext(SocketContext)

  const history = useHistory()
  const location = history.location.pathname

  const classesFiltered = sch_classes.filter(sch_classes => day === sch_classes.day);

  classesFiltered.sort (( a,b ) => a.hour - b.hour)

  function editButton(class_detail){
    setDisplayButton(true)  
    setFormData(class_detail)
  }

  function deleteButton(class_detail){

    socket.emit("delete_schedule", class_detail, result => {
      if (result.ok){
        setRefresh(!refresh)
      } else {
        console.log(result.errors)
      }

      setFormData({
        id : "",
        day: "",
        hour: "",
        coach: {id: "", name: ""},
        workout_plan: {id: "", name : "", difficulty : ""}
      })
    } )
  }



  const feedClassesContentJSX = classesFiltered.map(class_details => {
    let displayEditButton
    let styleLogedIn = {}

    if (location === "/schedules"){
      displayEditButton = 
                        <FeedUI.Extra>
                          { user ? <ButtonUI onClick={()=>editButton(class_details)} size="mini">Edit</ButtonUI> : ""}  
                          { user ? <ButtonUI onClick={()=>deleteButton(class_details)} size="mini">Delete</ButtonUI> : ""}
                        </FeedUI.Extra>
      if (user){
        styleLogedIn = user.id === class_details.coach.id && location === "/schedules" ? {backgroundColor: "yellow"} : {}
      }}

    return (
      <div key={class_details.id} style={ formData.id === class_details.id && location === "/schedules" ? {backgroundColor: "LightGray"} : {}} >
        <FeedUI.Event >
          <FeedUI.Content >
            
            <HeaderUI as="h4">Workout Plan: <Link to ={`/workout_plans/${class_details.workout_plan.id}`}>{class_details.workout_plan.name} </Link></HeaderUI>
            
            <FeedUI.Meta>
              Class ID: {class_details.id}
              <br />
              Difficulty: {class_details.workout_plan.difficulty} 
            </FeedUI.Meta>   
            
            <FeedUI.Summary>Time: {class_details.hour}</FeedUI.Summary>
            <p style= {styleLogedIn}
              >Coach: <FeedUI.User as={Link} to={`/coaches/${class_details.coach.id}`}>{class_details.coach.name} </FeedUI.User></p>
            
            { displayEditButton }

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