import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import {CurrentUserContext} from "./App"

import {
  Segment as SegmentUI,
  Header as HeaderUI,
  Menu as MenuUI
} from 'semantic-ui-react';

function Header() {
  const {user} = useContext(CurrentUserContext)
  console.log(user)

  return (
    <SegmentUI>
      <HeaderUI>
        <h1>Welcome to Flatiron Crossfit</h1>
      </HeaderUI>
      { user ? <p>Welcome {user.name}</p> : "no user" }
      <MenuUI width={5} size="large" pointing color="red">
        <MenuUI.Item
            as={NavLink}
            exact to="/"
            name="Home" />
          <MenuUI.Item
            as={NavLink}
             to="/schedules"
            name="Class Schedules" />
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

      </MenuUI>
    </SegmentUI>
  );
}

export default Header