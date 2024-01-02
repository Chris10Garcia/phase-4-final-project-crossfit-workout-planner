import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import {CurrentUserContext} from "./App"

import {
  Segment as SegmentUI,
  Header as HeaderUI,
  Menu as MenuUI,
  Image,
  Button
} from 'semantic-ui-react';

function MiniWelcome(){
    const {user, setUser} = useContext(CurrentUserContext)
    // if (!user) return <span> Welcome Guest</span>

    if (!user){
      return(
        <div>
          <Image src = {"https://cdn1.iconfinder.com/data/icons/sport-collection/100/Sport-003-1024.png"} avatar/>
          <span> Hello Guest </span>
        </div>
        )
      }

    function logout(){
      fetch("/logout", {
        method: "DELETE",
        headers: {"Content-Type" : "application/json"}
      })
      .then(r => setUser(null) )  // NEED TO REFRESH THE PAGE
      // .then(m => console.log(m))
      .catch(err => console.log(err))
    }

    return (
      <div>
        <Image src = {user.picture} avatar/>
        <span> Hello {user.name} </span>
        <Button type="submit" onClick={() => logout()} style = {{float: "right"}} >Click Here to Log out</Button>
        {/* <button style = {{float: "right"}} >Test test</button> */}
      </div>
    )

}

function Header() {

  return (
    <SegmentUI>
      <HeaderUI>
        <h1>Welcome to Flatiron Crossfit </h1>
        <MiniWelcome />
        
      </HeaderUI>
      {/* { user ? <p>Welcome {user.name}</p> : "no user" } */}
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