import React, {useState} from "react";

import ExerciseMoveForm from "./ExerciseMoveForm";
import PageFrame from "./PageFrame";
import ExerciseMoveDetails from "./ExerciseMoveDetails";


function ExerciseMove({ moves, refresh, setRefresh}) {
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

      {displayButton ? <ExerciseMoveForm title= {title} formData = {formData} setFormData={setFormData} refresh={refresh} setRefresh ={setRefresh}/> : "" }
      <ExerciseMoveDetails 
            dataList={moves} 
            setDisplayButton={setDisplayButton} 
            displayButton={displayButton} 
            setFormData={setFormData} formData = {formData}
            />
      
    </PageFrame>
  );
}

export default ExerciseMove