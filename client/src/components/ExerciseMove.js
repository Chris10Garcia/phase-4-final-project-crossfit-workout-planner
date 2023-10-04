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

  return (
    <PageFrame title = {title} dataList={moves} displayButton = {displayButton} setDisplayButton={setDisplayButton}>

      {displayButton ? <FormExerciseMove title= {title} formData = {formData} setFormData={setFormData} /> : "" }
      <ExerciseMoveDetails dataList={moves} setDisplayButton={setDisplayButton} displayButton={displayButton} setFormData={setFormData} formData = {formData}/>
      
    </PageFrame>
  );
}

export default ExerciseMove