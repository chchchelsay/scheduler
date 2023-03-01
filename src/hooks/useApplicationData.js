//setDay, bookInterview, cancelInterview defined here are used as props in Application.js/DayList/DayListItem/index.js

import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const setDay = (day) => setState({ ...state, day });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //updateSpots makes sure the right day/appt is accessed for the following book/cancel Interview functions
 
  const updateSpots = function (state, appointments, id) {
    const day = state.days.find((element) => {
      return element.appointments.includes(id);
    });
    let counter = 0;
    for (const appointmentId of day.appointments) {
      if (appointments[appointmentId].interview === null) {
        counter++;
      }
    }
    const updatedDay = { ...day, spots: counter };

    const updatedDays = [...state.days];
    const index = day.id - 1;
    updatedDays[index] = updatedDay;
    return updatedDays;
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function bookInterview(id, interview) {
    return axios
      .put(`api/appointments/${id}`, { interview })
      .then((response) => {
        if (response.status === 204) {
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview },
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };

          const days = updateSpots(state, appointments, id);

          setState({
            ...state,
            appointments,
            days,
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function cancelInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        if (response.status === 204) {
          const appointment = {
            ...state.appointments[id],
            interview: null,
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };

          const days = updateSpots(state, appointments, id);

          setState({
            ...state,
            appointments,
            days,
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  return { state, bookInterview, cancelInterview, setDay };
}
