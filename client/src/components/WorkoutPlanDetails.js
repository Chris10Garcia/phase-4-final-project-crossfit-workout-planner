import React from "react";
import { useParams, Link} from "react-router-dom";
import {
  Segment as SegmentUI,
  Header as HeaderUI, 
  Grid as GridUI, 
  Divider as DividerUI,
  Button as ButtonUI
} from 'semantic-ui-react';

function WorkoutPlanDetails({ dataList, setFormData, setDisplayButton }) {
  const params = useParams();
  const workoutPlan = dataList[params.itemID - 1];

  function editButton(){
    setDisplayButton(true)  
    setFormData({...workoutPlan})
  }

  if (!workoutPlan) return <h2>page loading...</h2>;

  const { exercise_moves } = workoutPlan;

  const exerciseMovesJSK = exercise_moves.map(move => {
    return (
      <GridUI.Column key={move.id}>
        <SegmentUI >
          <HeaderUI as="h3"><Link to = {`/exercise_moves/${move.id}`}>{move.name}</Link></HeaderUI>
          <p><b>Move focus: </b>{move.focus}</p>
          <DividerUI/>
          <p><b>Description: </b>{move.description}</p>
          {/* <p><b>Video URL Link:</b> <a href={move.video_link}>{move.video_link}</a></p> */}
        </SegmentUI>
      </GridUI.Column>

    );
  });

  return (
    <React.Fragment>
      
      <HeaderUI> Workout Plan Details</HeaderUI>
      <ButtonUI id = {workoutPlan.id} > Edit</ButtonUI> {/* onClick={() => editButton()} */}
      <br /><br />
      <HeaderUI as="h2">{workoutPlan.name}</HeaderUI>
      <p><b>Workout Plan ID:</b> {workoutPlan.id}</p>
      <p><b>Difficulty:</b> {workoutPlan.difficulty}</p>
      <p><b>Description:</b> {workoutPlan.description}</p>
      <DividerUI />
      <HeaderUI as="h3">Exercise Moves Involved </HeaderUI>
      <SegmentUI padded>
        <GridUI stackable columns={3}>
          {exerciseMovesJSK}
        </GridUI>
      </SegmentUI>
    </React.Fragment>
  );
}

export default WorkoutPlanDetails