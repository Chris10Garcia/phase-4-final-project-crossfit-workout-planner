import React, { useContext, useState } from "react";
import { Field, Form, Formik } from "formik";
import { CurrentUserContext } from "./App";
import { Segment } from "semantic-ui-react";

export function LogIn() {
  const { user, setUser } = useContext(CurrentUserContext);
  const [ errors, setErrors] = useState([])

  return (

    <Segment>
      <h1>Welcome and log in here</h1>
      <Formik
        initialValues={{ username: "", password: ""}}
        onSubmit={values => {
          fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
          })
            .then(r => {
              if (r.ok) {
                r.json().then(data => setUser(data));
              } else {
                r.json().then(err => setErrors(err));
                // r.json().then(err => console.log(err));
              }
            });
        }}
      >

        {formik => (
          <Form>
            <label>Username</label>
            <Field id="username" name="username" placeholder="Type in username" value={formik.values.username} onChange={formik.handleChange} />
            <br/>
            { errors ? <p style ={{color: "red"}}> {errors.username} </p> : ""}
            <br />
            <label>Password</label>
            <Field id="password" name="password" placeholder="Type in password" value={formik.values.password} onChange={formik.handleChange} />
            <br/>
            { errors ? <p style ={{color: "red"}}> {errors.password} </p> : ""}
            <button type="submit">Submit</button>
          </Form>
        )}

      </Formik>
      <p>Current user is {user ? user.name : null}</p>
    </Segment>

  );
}
