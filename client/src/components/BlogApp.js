import React, {useState} from "react";

import { Formik, Form, Field, FieldArray } from "formik";

/*

Coach
- OPTIONAL:
  - if i do authentication, have coach can edit their own profile
  - move the adding coach form to sign up / log in page

*/
export default function BlogApp() {
  /*
  NOT TO BE GRADED. PURPOSE OF THIS COMPONENT IS TO ENSURE CODE WORKS FOR MY BLOG ENTRY
  */

  // const [dispalyData, setDisplayData] = useState(initialValues)

  const colors = ["Red", "Green", "Blue", "White", "Black", "Yellow", "Orange"];
  const subjects = ["Calculus", "English Lit", "History", "Social Studies", "Physics"];

  const initialValues = {
    name: "",
    color: "",
    records: [{ subject: "", grade: "" }]
  };

  return (
    <div  >
      <h1>Blog Code</h1>
      <div>
      <Formik
        initialValues={initialValues}
        onSubmit={values => alert(JSON.stringify(values, null, 3))} >
          {/* <Form >
            <label>Student Name</label>
            <Field name="name" placeholder="Jane Doe" /> <br /> <br />

            <label>Favorite Color</label>
            <Field name="color" as="select">
              <option label="Make a section" value="" />
              {colors.map(color => <option key={color} label={color} value={color} />)}
            </Field> <br /><br /> <br />
            <button type="submit">Submit</button>


            
          </Form> */}


        {formik => (
          <Form >
            <label>Student Name</label>
            <Field name="name" placeholder="Jane Doe" label="Student Name" /> <br /> <br />

            <label>Favorite Color</label>
            <Field name="color" as="select">
              <option label="Make a section" value="" />
              {colors.map(color => <option key={color} label={color} value={color} />)}
            </Field> <br /><br /> <br />

            <FieldArray name="records">

              {({ push, remove }) => (
                <div>
                  <div style={{display:"flex", "flexWrap": "wrap"}}>
                    {formik.values.records.length > 0 && formik.values.records.map((record, index) => (
                      <div key={index} style={{ border: "3px solid black" }}>

                        <label>Grade Value</label>
                        <Field name={`records.${index}.grade`} /> <br /><br />

                        <label>Subject</label>
                        <Field name={`records.${index}.subject`} as="select">
                          <option label="Make a section" value="" />
                          {subjects.map(subject => <option key={subject} label={subject} value={subject} />)}
                        </Field> <br /><br />

                        <button type="button" onClick={() => remove(index)}>Remove</button><br /><br /><br />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => push({ grade: "", subject: "" })}>Add More</button><br /><br />
                </div>
              )}

</FieldArray>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
}
