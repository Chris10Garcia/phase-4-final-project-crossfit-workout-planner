import React, {useState} from "react";

import ExerciseMoveForm from "./ExerciseMoveForm";
import PageFrame from "./PageFrame";
import ExerciseMoveDetails from "./ExerciseMoveDetails";

// import { CurrentUserContext } from "./App";

function ExerciseMove({ moves, refresh, setRefresh}) {
  const title = "Exercise Move"
  // const {user} = useContext(CurrentUserContext)
  const [displayButton, setDisplayButton] = useState(false)

  const clearFormValues = {
    id: "",
    name: "",
    focus: "",
    description: "",
    video_link: ""
}

  const [formData, setFormData] = useState(clearFormValues)

  // const displayForm = displayButton   ? <ExerciseMoveForm 
  //                                         title= {title} formData = {formData} 
  //                                         setFormData={setFormData} refresh={refresh} 
  //                                         setRefresh ={setRefresh} clearFormValues={clearFormValues} /> 
  //                                     : ""

  return (
    <PageFrame title = {title} dataList={moves} displayButton = {displayButton} setDisplayButton={setDisplayButton}>
      {/* { user ? displayForm : ""} */}
      { displayButton   ? <ExerciseMoveForm 
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