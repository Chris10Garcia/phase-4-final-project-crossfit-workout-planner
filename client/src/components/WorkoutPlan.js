import React, { useState } from "react";
import PageFrame from "./PageFrame";
import WorkoutPlanDetails from "./WorkoutPlanDetails";

function WorkoutPlan({ plans, refresh, setRefresh }) {

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
    <PageFrame title={"Workout Plan"} dataList={plans} displayButton = {displayButton} setDisplayButton={setDisplayButton}>

      {""}
      <WorkoutPlanDetails dataList={plans} setDisplayButton={setDisplayButton} displayButton={displayButton} setFormData={setFormData} formData = {formData}/>

    </PageFrame>
  );
}

export default WorkoutPlan