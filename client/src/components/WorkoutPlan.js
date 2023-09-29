import React from "react";
import PageFrame from "./PageFrame";
import WorkoutPlanDetails from "./WorkoutPlanDetails";

function WorkoutPlan({ plans }) {
  return (
    <PageFrame
      title={"Workout Plan"}
      dataList={plans}>
      <WorkoutPlanDetails dataList={plans} />
    </PageFrame>
  );
}

export default WorkoutPlan