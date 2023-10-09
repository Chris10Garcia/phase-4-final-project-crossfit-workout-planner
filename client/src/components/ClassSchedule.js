import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Segment as SegmentUI,
  Header as HeaderUI,
  Card as CardUI,
  Form as FormUI,
} from 'semantic-ui-react';

import ClassScheduleDetails  from "./ClassScheduleDetails";

/*
day, hour, coach_id / coach, workout_plan_id / workout_plan
*/

// function FormClassSchedule(){
//   const formSchema = yup.object().shape({
//     day: yup.string().required(),
//     hour: yup.string(),
//     coach_id: yup.number().integer(),
//     workout_plan_id: yup.number().integer(),
//   });

//   const formik = useFormik({
//     initialValues: {
//       day: "",
//       hour: "",

//       coach_id: "",
//       workout_plan_id: "",
//     },
//     validationSchema: formSchema,
//     onSubmit: values =>{
//       console.log(values)
//     }
//   })

//   return(
//     <SegmentUI>
//     <FormUI onSubmit = {formik.handleSubmit}>
//       <FormUI.Field>
//         <label htmlFor="day">Day</label>
//         <br />
//         <input 
//           id = "day"
//           name = "day"
//           onChange = {formik.handleChange}
//           value = {formik.values.day}
//         />
//         <p style={{color: "red"}}>{formik.errors.hour}</p>
//       </FormUI.Field>
//     </FormUI>
//     </SegmentUI>
//   )
// }

/* 
  Copy WorkoutPlanForm
  Edit the attrs and varriables
  It will need a single selection of a coach
  it will need a single selection of a workout plan

*/

function ClassSchedule({ sch_classes }) {
  const [displayButton, setDisplayButton] = useState(false)
  const days = new Set();

  sch_classes.forEach(element => days.add(element.day));


  return (
    <SegmentUI>
      <HeaderUI>
        <h2>Here are all the classes being taught, what the plan is and the coach teaching it</h2>
      </HeaderUI>
      {/* <FormClassSchedule /> */}
      <CardUI.Group>
        { [...days].map(day => <ClassScheduleDetails key={day} day={day} sch_classes={sch_classes} displayButton = {displayButton} setDisplayButton = {setDisplayButton} />) }
      </CardUI.Group>
    </SegmentUI>
  );
}

export default ClassSchedule