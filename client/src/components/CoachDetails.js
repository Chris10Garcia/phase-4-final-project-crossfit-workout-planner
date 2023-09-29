import React from "react";
import { useParams } from "react-router-dom";
import {
  Segment as SegmentUI,
  Header as HeaderUI, 
  Divider as DividerUI,
  Container as ContainerUI,
  Image as ImageUI } from 'semantic-ui-react';

function CoachDetails({ dataList }) {
  const params = useParams();
  const coach = dataList[params.itemID - 1];

  if (!coach) return <h2>page loading...</h2>;

  return (
    <React.Fragment>
        <HeaderUI>Coach Details</HeaderUI>
        <ContainerUI>
            <HeaderUI as="h2">{coach.name}</HeaderUI>
            <ImageUI src = {coach.picture} size = "medium"/>
            <DividerUI />
            <p><b>Coach ID:</b> {coach.id}</p>
            <p><b>Age:</b> {coach.age}</p>
        </ContainerUI>
    </React.Fragment>
  );
}

export default CoachDetails