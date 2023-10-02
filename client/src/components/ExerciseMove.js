import React from "react";
import PageFrame from "./PageFrame";
import ExerciseMoveDetails from "./ExerciseMoveDetails";

function ExerciseMove({ moves }) {

  return (
    <PageFrame
      title={"Exercise Move"}
      dataList={moves}>
      <ExerciseMoveDetails dataList={moves} />
    </PageFrame>
  );
}

export default ExerciseMove