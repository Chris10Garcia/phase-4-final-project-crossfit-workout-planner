import React, {useState} from "react";

import ExerciseMoveForm from "./ExerciseMoveForm";
import PageFrame from "./PageFrame";
import ExerciseMoveDetails from "./ExerciseMoveDetails";


function ExerciseMove({ moves, refresh, setRefresh}) {
  const title = "Exercise Move"

  const [displayButton, setDisplayButton] = useState(false)

  const clearFormValues = {
    id: "",
    name: "",
    focus: "",
    description: "",
    video_link: ""
}

  const [formData, setFormData] = useState(clearFormValues)


  return (
    <PageFrame title = {title} dataList={moves} displayButton = {displayButton} setDisplayButton={setDisplayButton}>
      {displayButton  ? <ExerciseMoveForm 
                                  title= {title} formData = {formData} 
                                  setFormData={setFormData} refresh={refresh} 
                                  setRefresh ={setRefresh} clearFormValues={clearFormValues} /> 
                      : "" }
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