import React, { useState } from "react";
import PageFrame from "./PageFrame";
import CoachDetails from "./CoachDetails";

function Coach({ coaches }) {
  const title = "Coach"

  const [displayButton, setDisplayButton] = useState(false)

  // REDO ATTRIBUTES
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    focus: "",
    description: "",
    video_link: ""
})


  return (
    <PageFrame title={title} dataList={coaches} displayButton = {displayButton} setDisplayButton={setDisplayButton}>
        
      {""}
      <CoachDetails dataList={coaches} setDisplayButton={setDisplayButton} displayButton={displayButton} setFormData={setFormData} formData = {formData}/>

    </PageFrame>
  );
}

export default Coach