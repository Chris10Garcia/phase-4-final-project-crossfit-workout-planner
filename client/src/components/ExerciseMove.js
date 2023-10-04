import React, {useState} from "react";

import FormExerciseMove from "./FormExerciseMove";
import PageFrame from "./PageFrame";
import ExerciseMoveDetails from "./ExerciseMoveDetails";

import {
  Button as ButtonUI,
  TextArea as TextAreaUI} from "semantic-ui-react"

  
function ExerciseMove({ moves }) {
  const title = "Exercise Move"

  const [displayButton, setDisplayButton] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    focus: "",
    description: "",
    video_link: ""
})


  function editButton(id){
    const move = moves.find( obj => obj.id === parseInt(id, 10))
    setDisplayButton(true)
    setFormData({...move})  
  }

  return (
    <PageFrame
      title = {title}
      dataList={moves}>
      {displayButton ? <FormExerciseMove title= {title} formData = {formData} setFormData={setFormData} /> : "" }
      <ExerciseMoveDetails dataList={moves} editButton={editButton} setDisplayButton={setDisplayButton} displayButton={displayButton}/>
      
    </PageFrame>
  );
}

export default ExerciseMove