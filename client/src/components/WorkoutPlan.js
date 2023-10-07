import React, { useState } from "react";
import PageFrame from "./PageFrame";
import WorkoutPlanDetails from "./WorkoutPlanDetails";
import WorkoutPlanForm from "./WorkoutPlanForm";

function WorkoutPlan({ plans, refresh, setRefresh, moves }) {
  const title = "Workout Plan"
  const [displayButton, setDisplayButton] = useState(false)


  const [formData, setFormData] = useState({
    id: "",
    name: "",
    difficulty: "",
    description: "",
    exercise_moves: [{
      id: "",
  }]
})
  
  return (
    <PageFrame title={"Workout Plan"} dataList={plans} displayButton = {displayButton} setDisplayButton={setDisplayButton}>

      {displayButton ? <WorkoutPlanForm title= {title} formData = {formData} setFormData={setFormData} refresh={refresh} setRefresh ={setRefresh} moves = { moves }/> : "" } 
      <WorkoutPlanDetails dataList={plans} setDisplayButton={setDisplayButton} displayButton={displayButton} setFormData={setFormData} formData = {formData}/>

    </PageFrame>
  );
}

export default WorkoutPlan