import React, { useContext } from "react";
import { Formik, setNestedObjectValues } from "formik";
import { CurrentUserContext, SocketContext } from "./App";
import { 
  Segment as SegmentUI,
  Form as FormUI
} from "semantic-ui-react";
import * as yup from "yup";

export function LogInForm() {
  const { setUser } = useContext(CurrentUserContext);
  const {socket} = useContext(SocketContext)

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

  // async function submitLogIn(data){
  //   return fetch("/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data)
  //   })
  // }

  async function submitLogIn(data){
    socket.emit("login", data, result => {
      if (result.ok){
        setUser(result.user)
        console.log(result)

      } else {
        // actions.setErrors(result.errors)
      } 
    })
    // const test = await socket.emit ("login", data, abc => {
    //     console.log(abc.ok)
    //     console.log(abc.user)
    //     return abc
    //   // return "hello"
    // })
    // return test

    // await socket.on("login", data => console.log(data))


  //   await socket.on("login", data => {
  //     console.log("user log in")
  //     console.log(data)})
  //     return "yes"

  }

  return (

    <SegmentUI>
      <h1>Welcome and log in here</h1>
      <Formik initialValues={logInForm} onSubmit={(values, actions)=> {
        const result = submitLogIn(values)
        result.then(r => {
          // console.log(r)
          // if (r.ok) {
          //   r.json().then(data => setUser(data));
          // } else {
          //   r.json().then(err => actions.setErrors(err));
          // }
        });

      } }
      
      validationSchema={formSchema}>
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
