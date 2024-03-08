import React, { useContext } from "react";
import { Formik } from "formik";
import { CurrentUserContext, SocketContext } from "./App";
import { 
  Segment as SegmentUI,
  Form as FormUI
} from "semantic-ui-react";
import * as yup from "yup";

export function LogInForm() {
  const { setUser } = useContext(CurrentUserContext);
  const socket = useContext(SocketContext)

  const logInForm = { username : "", password : ""}

  const formSchema = yup.object().shape({
    username: yup.string()
      .min(2, "Username is too short")
      .max(40, "Username is too long")
      .required("Username is require")
      ,
    password: yup.string()
      .min(2, "Password is too short")
      .max(40, "Password is too long")
      .required("Password is require")
      ,
  });


  async function submitLogIn(data, actions){
    socket.emit("login", data, result => {
      if (result.ok){
        setUser(result.user)

      } else {
        actions.setErrors(result.errors)
      } 
    })

  }

  return (

    <SegmentUI>
      <h1>Welcome and log in here</h1>
      <Formik initialValues={logInForm} onSubmit={(values, actions)=> {
          submitLogIn(values, actions)
      } }
      validationSchema={formSchema} ENABLE THIS AGAIN ONCE DEBUGGING IS DONE
      >
        { formik => (
          <FormUI onSubmit={formik.handleSubmit}>
            <label>Username</label>
            <FormUI.Field id="username" name="username" placeholder="Type in username" control = "input" value={formik.values.username} onChange={formik.handleChange} />
            <p style ={{color: "red"}}> {formik.errors.username} </p>
            <label>Password</label>
            <FormUI.Field id="password" name="password" placeholder="Type in password" control = "input" type="password"value={formik.values.password} onChange={formik.handleChange} />
            <p style ={{color: "red"}}> {formik.errors.password} </p>            
            <FormUI.Button type="submit">Submit</FormUI.Button>
          </FormUI>
        )}

      </Formik>
    </SegmentUI>

  );
}
