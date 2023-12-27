import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { CurrentUserContext } from "./App";

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

  const { user } = useContext(CurrentUserContext)

  if (!coach) return <h2>page loading...</h2>;

  function editButton(){
    setDisplayButton(true)  
    setFormData(coach)
  }

  return (
    <React.Fragment>
        <HeaderUI>Coach Details</HeaderUI>
        { user ? <ButtonUI id = {coach.id} onClick={() => editButton()}>Edit</ButtonUI> : ""}

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