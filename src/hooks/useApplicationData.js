import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

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
    return { state, bookInterview, cancelInterview, setDay }
  }