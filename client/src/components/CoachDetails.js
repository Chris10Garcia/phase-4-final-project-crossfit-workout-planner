import React from "react";
import { useParams } from "react-router-dom";
import {
  Segment as SegmentUI,
  Header as HeaderUI, 
  Grid as GridUI, 
  Divider as DividerUI,
  Container as ContainerUI,
  Image as ImageUI
} from 'semantic-ui-react';

function CoachDetails({ dataList }) {
  const params = useParams();
  const coach = dataList[params.itemID - 1];

  if (!coach) return <h2>page loading...</h2>;

  return (
    <SegmentUI>
        <HeaderUI> Exercise Move Details</HeaderUI>
        <ContainerUI>
            <HeaderUI as="h2">{coach.name}</HeaderUI>
            <ImageUI src = {coach.picture} size = "medium"/>
            <DividerUI />
            <p><b>Coach ID:</b> {coach.id}</p>
            <p><b>Age:</b> {coach.age}</p>
        </ContainerUI>
    </SegmentUI>
  );
}

export default CoachDetails