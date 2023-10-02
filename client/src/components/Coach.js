import React from "react";
import PageFrame from "./PageFrame";
import CoachDetails from "./CoachDetails";

function Coach({ coaches }) {
  return (
    <PageFrame
      title={"Coach"}
      dataList={coaches}>
        
        {/*  */}
      <CoachDetails dataList={coaches} />
    </PageFrame>
  );
}

export default Coach