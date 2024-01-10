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
        initialValues={{ username: "", }}
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
              }
            });
        }}
      >

        {formik => (
          <Form>
            <label>Username</label>
            <Field id="username" name="username" placeholder="Type in username" value={formik.values.username} onChange={formik.handleChange} />
            <button type="submit">Submit</button>
            <br/>
            { errors ? <p style ={{color: "red"}}> {errors.message} </p> : ""}
          </Form>
        )}

      </Formik>
      <p>Current user is {user ? user.name : null}</p>
    </Segment>

  );
}
