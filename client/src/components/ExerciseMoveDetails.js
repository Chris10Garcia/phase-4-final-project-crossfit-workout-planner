import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Header as HeaderUI, 
  Divider as DividerUI,
  Container as ContainerUI,
  Button as ButtonUI
} from 'semantic-ui-react';

function ExerciseMoveDetails({ dataList, setFormData, setDisplayButton}) {
  const params = useParams();
  const exerciseMove = dataList[params.itemID - 1];
  
    
  function editButton(){
    setDisplayButton(true)  
    setFormData({...exerciseMove})
  }

  if (!exerciseMove) return <h2>page loading...</h2>;

  return (
    <React.Fragment>
        <HeaderUI> Exercise Move Details </HeaderUI> 
        <ButtonUI id = {exerciseMove.id} onClick={() => editButton()}> Edit</ButtonUI> 
        <br /><br />
        <ContainerUI>
            <HeaderUI as="h2">{exerciseMove.name}</HeaderUI>
            <DividerUI />
            <p><b>Exercise Move ID:</b> {exerciseMove.id}</p>
            <p><b>Body Movement Focus:</b> {exerciseMove.focus}</p>
            <p><b>Description:</b> {exerciseMove.description}</p>
            <p><b>Youtube Video Link:</b> {exerciseMove.video_link}</p>
        </ContainerUI>
    </React.Fragment>
  );
}

export default ExerciseMoveDetails