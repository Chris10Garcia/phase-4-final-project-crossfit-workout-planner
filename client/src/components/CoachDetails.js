import React from "react";
import { useParams } from "react-router-dom";

import {
  Header as HeaderUI, 
  Divider as DividerUI,
  Container as ContainerUI,
  Image as ImageUI,
  Button as ButtonUI
} from 'semantic-ui-react';

function CoachDetails({ dataList, setDisplayButton, setFormData }) {
  const params = useParams();
  const coach = dataList[params.itemID - 1];

  if (!coach) return <h2>page loading...</h2>;

  function editButton(){
    setDisplayButton(true)  
    setFormData(coach)
  }

  return (
    <React.Fragment>
        <HeaderUI>Coach Details</HeaderUI>
        <ButtonUI id = {coach.id} onClick={() => editButton()}>Edit</ButtonUI> 
        <br /><br />
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