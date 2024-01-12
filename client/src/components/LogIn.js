import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { CurrentUserContext } from "./App";
import { 
  Segment as SegmentUI,
  Form as FormUI
} from "semantic-ui-react";

export function LogIn() {
  const { user, setUser } = useContext(CurrentUserContext);
  const [ errors, setErrors] = useState({})

  const logInForm = { username : "", password : ""}

  function submitLogIn(data){
    console.log(data)
    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(r => {
        if (r.ok) {
          r.json().then(data => setUser(data));
        } else {
          r.json().then(err => {
            setErrors(err)
          });
        }
      });
  }

  return (

    <SegmentUI>
      <h1>Welcome and log in here</h1>
      <Formik initialValues={logInForm} onSubmit={ submitLogIn } >
        { formik => (
          <FormUI onSubmit={formik.handleSubmit}>
            <label>Username</label>
            <FormUI.Field id="username" name="username" placeholder="Type in username" control = "input" value={formik.values.username} onChange={formik.handleChange} />
            { errors ? <p style ={{color: "red"}}> {errors.username} </p> : ""}
            <label>Password</label>
            <FormUI.Field id="password" name="password" placeholder="Type in password" control = "input" value={formik.values.password} onChange={formik.handleChange} />
            { errors ? <p style ={{color: "red"}}> {errors.password} </p> : ""}
            
            <FormUI.Button type="submit">Submit</FormUI.Button>
          </FormUI>
        )}

      </Formik>
      <p>Current user is {user ? user.name : null}</p>
    </SegmentUI>

  );
}
