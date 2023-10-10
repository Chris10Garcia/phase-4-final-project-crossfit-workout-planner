import React from "react";
import { Link } from "react-router-dom"
import {
  Header as HeaderUI,
  Card as CardUI,
  Feed as FeedUI,
  Divider as DividerUI,
  Button as ButtonUI
} from 'semantic-ui-react';

function ClassScheduleDetails({ day, sch_classes, setDisplayButton, setFormData }) {

  const classesFiltered = sch_classes.filter(sch_classes => day === sch_classes.day);

  classesFiltered.sort ( (a,b) => {
    return a.hour - b.hour
  })

  function editButton(class_detail){
    setDisplayButton(true)  
    setFormData(class_detail)
  }

  const feedClassesContentJSX = classesFiltered.map(class_details => {
    return (
      <FeedUI.Event key={class_details.id} >
        <FeedUI.Content >

          <HeaderUI as="h4">Workout Plan: <Link to ={`/workout_plans/${class_details.workout_plan.id}`}>{class_details.workout_plan.name} </Link></HeaderUI>
            <FeedUI.Meta>
              Class ID: {class_details.id}
              <br />
              Difficulty: {class_details.workout_plan.difficulty} 
            </FeedUI.Meta>
          
          
          <FeedUI.Summary>Time: {class_details.hour}</FeedUI.Summary>

          <p>Coach: <FeedUI.User as={Link} to={`/coaches/${class_details.coach.id}`}>{class_details.coach.name} </FeedUI.User></p>
            <FeedUI.Extra><ButtonUI onClick={()=>editButton(class_details)} size="mini">Edit</ButtonUI></FeedUI.Extra>
          <DividerUI />
        </FeedUI.Content>
      </FeedUI.Event>
    );
  });


  return (
    <CardUI style={{"vertical-align" : "top", "display": "inline-block"}}>
      <CardUI.Content>
        <CardUI.Header as="h1"> {day} </CardUI.Header>
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