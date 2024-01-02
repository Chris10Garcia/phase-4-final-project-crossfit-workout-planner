import React, { useContext } from "react";
import { CurrentUserContext } from "./App";
import {
  Image,
  Button
} from 'semantic-ui-react';

function MiniWelcome() {
  const { user, setUser } = useContext(CurrentUserContext);
  // if (!user) return <span> Welcome Guest</span>
  if (!user) {
    return (
      <div>
        <Image src={"https://cdn1.iconfinder.com/data/icons/sport-collection/100/Sport-003-1024.png"} avatar />
        <span> Hello Guest </span>
      </div>
    );
  }

  function logout() {
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(r => setUser(null)) // NEED TO REFRESH THE PAGE

      // .then(m => console.log(m))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Image src={user.picture} avatar />
      <span> Hello {user.name} </span>
      <Button type="submit" onClick={() => logout()} style={{ float: "right" }}>Click Here to Log out</Button>
      {/* <button style = {{float: "right"}} >Test test</button> */}
    </div>
  );

}

export default MiniWelcome