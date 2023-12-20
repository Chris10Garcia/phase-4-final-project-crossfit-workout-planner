import React, { useContext } from "react";
import { Field, Form, Formik } from "formik";
import { CurrentUserContext } from "./App";

export function LogIn() {
  const { user, setUser } = useContext(CurrentUserContext);

  return (

    <React.Fragment>
      <Formik
        initialValues={{ username: "", }}
        onSubmit={values => {

          console.log(values);
          fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
          })
            .then(r => {
              // console.log(r)
              if (r.ok) {
                r.json().then(data => setUser(data));
                console.log(user);
              } else {
                r.json().then(err => console.log(err)); // log in failed, try again
              }
            });
        }}
      >

        {formik => (
          <Form>
            <label>Username</label>
            <Field id="username" name="username" placeholder="Type in username" value={formik.values.username} onChange={formik.handleChange} />
            <button type="submit">Submit</button>
          </Form>
        )}

      </Formik>
      <p>Current user is {user ? user.name : null}</p>
    </React.Fragment>

  );
}
