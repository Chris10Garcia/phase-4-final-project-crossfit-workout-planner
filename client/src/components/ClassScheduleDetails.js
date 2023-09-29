import React from "react";
import { Link } from "react-router-dom"
import {
  Header as HeaderUI,
  Card as CardUI,
  Feed as FeedUI,
  Divider as DividerUI
} from 'semantic-ui-react';

function ClassScheduleDetails({ day, sch_classes }) {

  const classesFiltered = sch_classes.filter(sch_classes => day === sch_classes.day);

  const feedClassesContentJSX = classesFiltered.map(class_details => {
    return (
      <FeedUI.Event key={class_details.id}>
        <FeedUI.Content>

          <HeaderUI as="h4">Workout Plan: <Link to ={`/workout_plans/${class_details.workout_plan.id}`}>{class_details.workout_plan.name} </Link>
              <FeedUI.Meta>Difficulty: {class_details.workout_plan.difficulty} </FeedUI.Meta>
          </HeaderUI>
          
          <FeedUI.Summary>Time: {class_details.hour}</FeedUI.Summary>

          <p>Coach: <FeedUI.User as={Link} to={`/coaches/${class_details.coach.id}`}>{class_details.coach.name} </FeedUI.User></p>
          
          <DividerUI />
        </FeedUI.Content>
      </FeedUI.Event>
    );
  });


  return (
    <CardUI>
      <CardUI.Content>
        <CardUI.Header as="h1"> {day} </CardUI.Header>
      </CardUI.Content>
      <CardUI.Content>
        <FeedUI>
          {feedClassesContentJSX}
        </FeedUI>
      </CardUI.Content>
    </CardUI>
  );
}

export default ClassScheduleDetails