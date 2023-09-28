import React from "react";
import {
  Segment as SegmentUI,
  Header as HeaderUI,
  Card as CardUI
} from 'semantic-ui-react';

import ClassScheduleDetails  from "./ClassScheduleDetails";

export function ClassSchedule({ sch_classes }) {
  const days = new Set();

  sch_classes.forEach(element => days.add(element.day));

  const classDetailsJSX = [...days].map(day => <ClassScheduleDetails key={day} day={day} sch_classes={sch_classes} />);

  return (
    <SegmentUI>
      <HeaderUI>
        <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
      </HeaderUI>
      <CardUI.Group>
        {classDetailsJSX}
      </CardUI.Group>
    </SegmentUI>
  );
}

export default ClassSchedule