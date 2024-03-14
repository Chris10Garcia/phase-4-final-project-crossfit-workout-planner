import React, { useEffect, useState, createContext } from "react";
import { Switch, Route } from "react-router-dom";

import { io } from "socket.io-client"

import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import WorkoutPlan from "./WorkoutPlan";
import ExerciseMove from "./ExerciseMove";
import Coach from "./Coach";
import BlogApp from "./BlogApp";

import { 
  Segment as SegmentUI, 
  } from 'semantic-ui-react'
import { LogInForm } from "./LogInForm";

const socket = io("localhost:5555", {
  transports: ["websocket"],
  cors: { origin: "*",},

})

const SocketContext = createContext(socket)

const CurrentUserContext = createContext(null)




function App() {
  const [coaches, setCoaches] = useState([])
  const [moves, setMoves] = useState([])
  const [sch_classes, setSchClasses] = useState([])
  const [plans, setPlans] = useState([])
  const [refresh, setRefresh] = useState(false)

  // for testing purposes
  // const [user, setUser] = useState(
  //   {id: 1, name: 'Chris Garcia', age: 33, picture: 'https://avatars.githubusercontent.com/u/10578405?v=4', username: 'chrisgarcia'}
  // )


  const [user, setUser] = useState(null)

  socket.on("connected", (data)=>{
    console.log(data)
  })
  

  useEffect(()=>{
    
    // setSocketInstance(socket)

    // this solves the issue
    socket.emit("refresh", ()=>{
      setRefresh(!refresh)
    })

    socket.on("coaches",  data => setCoaches([...data]))
    socket.on("schedules",  data => setSchClasses([...data]))
    socket.on("workout_plans",  data => setPlans([...data]))
    socket.on("exercise_moves",  data => setMoves([...data]))


  }, [refresh])


  return (
  <SocketContext.Provider value = {socket}>
    <CurrentUserContext.Provider value={{user, setUser}}>
      <SegmentUI.Group>
        <Header />
        <Switch>
          <Route exact path = "/">
            { user ? <ClassSchedule sch_classes = {sch_classes} plans = { plans } coaches = {coaches} refresh={refresh} setRefresh ={setRefresh} /> : <LogInForm />}
          </Route>
          <Route path = "/schedules">
            <ClassSchedule sch_classes = { sch_classes } plans = { plans } coaches = {coaches} refresh={refresh} setRefresh ={setRefresh}/>
          </Route>
          <Route path = "/workout_plans" > 
            <WorkoutPlan plans = { plans } moves={ moves } refresh={refresh} setRefresh ={setRefresh}/>
          </Route>
          <Route path = "/exercise_moves" >
            <ExerciseMove moves = { moves } refresh={refresh} setRefresh ={setRefresh} />
          </Route>
          <Route path = "/coaches" >
            <Coach coaches = {coaches} refresh={refresh} setRefresh ={setRefresh}/>
          </Route>

          {/* NOT TO BE GRADED. PURPOSE OF THIS IS TO ENSURE CODE FOR BLOG WORKS */}
          <Route path = "/blog" >
            <SegmentUI>
              <BlogApp  />
            </SegmentUI>
          </Route>

        </Switch>
      </ SegmentUI.Group>
    </CurrentUserContext.Provider>
  </SocketContext.Provider>
  )

}

export default App;
export {CurrentUserContext, SocketContext}
