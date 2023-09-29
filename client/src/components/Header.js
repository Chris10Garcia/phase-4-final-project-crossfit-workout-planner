import React from "react";
import { NavLink } from "react-router-dom";
import {
  Segment as SegmentUI,
  Header as HeaderUI,
  Menu as MenuUI
} from 'semantic-ui-react';

function Header() {
  return (
    <SegmentUI>
      <HeaderUI>
        <h1>Welcome to Flatiron Crossfit</h1>
      </HeaderUI>
      <MenuUI width={5} size="large" pointing color="yellow">
        <MenuUI.Item
          as={NavLink}
          exact to="/"
          name="Class Schedule" />
        <MenuUI.Item
          as={NavLink}
          to="/workout_plans"
          name="Workout Plans" />
        <MenuUI.Item
          as={NavLink}
          to="/exercise_moves"
          name="Exercise Moves" />
        <MenuUI.Item
          as={NavLink}
          to="/coaches"
          name="Coaches" />
        {/* <MenuUI.Item
              as = { NavLink }
              to ="/"
              name = "Crossfit Builder"
            />    */}

      </MenuUI>
    </SegmentUI>
  );
}

export default Header