import React, { useContext } from "react";
import { Segment as SegmentUI } from 'semantic-ui-react';
import HomePageClassSchedule from "./HomePageClassSchedule";
import { CurrentUserContext } from "./App";

export function HomePage({ sch_classes, plans, coaches, refresh, setRefresh }) {
  const { user } = useContext(CurrentUserContext);

  const user_classes = sch_classes.filter(sch_class => sch_class.coach.id === user.id);

  console.log(user_classes);
  return (
    <SegmentUI>
      <h1>Welcome Coach {user.name}</h1>
      <HomePageClassSchedule sch_classes={user_classes} plans={plans} coaches={coaches} refresh={refresh} setRefresh={setRefresh} />
    </SegmentUI>
  );
}
