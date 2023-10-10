import React, { useState } from "react";
import PageFrame from "./PageFrame";
import CoachDetails from "./CoachDetails";
import CoachForm from "./CoachForm";

function Coach({ coaches, refresh, setRefresh }) {
  const title = "Coach"

  const [displayButton, setDisplayButton] = useState(false)

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    picture: "",
})

  /* 
  
  Coach Form is almost the same as Exercise Move form
  */
  return (
    <PageFrame title={title} dataList={coaches} displayButton = {displayButton} setDisplayButton={setDisplayButton}>
        
      {displayButton ? <CoachForm title= {title} formData = {formData} setFormData={setFormData} refresh={refresh} setRefresh ={setRefresh}/> : "" }
      
      <CoachDetails dataList={coaches} setDisplayButton={setDisplayButton} displayButton={displayButton} setFormData={setFormData} formData = {formData}/>

    </PageFrame>
  );
}

export default Coach