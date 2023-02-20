import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import 'components/Appointment'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {

    return axios.put(`api/appointments/${id}`, {interview})
        .then(response => {
          if (response.status === 204) {
            
            const appointment = {
              ...state.appointments[id],
              interview: { ...interview }
            };
        
            const appointments = {
              ...state.appointments,
              [id]: appointment
            };
        
            setState({
              ...state,
              appointments
            })
          }
        }).catch(error => {
          throw new Error(error)
        })
    }
  
    function cancelInterview(id) {
      return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        if (response.status === 204) {
          const appointment = {
            ...state.appointments[id],
            interview: null
          };
      
          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
      
          setState({
            ...state,
            appointments
          })
        } 
      }).catch(error => {
        throw new Error(error)
      })
    }
    
const setDay = day => setState({ ...state, day });

const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const appointment = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id}
        name={appointment.name}
        interview={interview}
        interviewers={(getInterviewersForDay(state, state.day))}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
      )
  });


useEffect(() => {
    Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
    ])
    .then(all => {
   
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">

<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
</section>
<section className="schedule">
  {appointment} 
  <Appointment lastAppointment={true} time="5pm" />
      </section>
    </main>
  );
}

