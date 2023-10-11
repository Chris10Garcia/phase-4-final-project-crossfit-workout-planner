import React, { useState } from "react";

import PageFrame from "./PageFrame";
import CoachDetails from "./CoachDetails";
import CoachForm from "./CoachForm";

function Coach({ coaches, refresh, setRefresh }) {
  

  const [displayButton, setDisplayButton] = useState(false)

  const clearFormValues = {
    id: "",
    name: "",
    age: "",
    picture: "",
  }

  const [formData, setFormData] = useState( clearFormValues )
  const title = "Coach"

  return (
    <PageFrame title={title} dataList={coaches} displayButton = {displayButton} setDisplayButton={setDisplayButton}>
        
      { displayButton ? <CoachForm 
                              title= {title} formData = {formData} 
                              setFormData={setFormData} refresh={refresh} 
                              setRefresh ={setRefresh} clearFormValues={clearFormValues} /> 
                      : "" }
      
      < CoachDetails 
                dataList={coaches} setDisplayButton={setDisplayButton} 
                displayButton={displayButton} setFormData={setFormData} 
                ormData = {formData }/>

    </PageFrame>
  );
}

export default Coach