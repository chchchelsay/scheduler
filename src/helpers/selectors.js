//these are helper functions used in Application.js to fetch interview/interviewer data based on selected day/appointment

export const getAppointmentsForDay = (state, day) => {
  const dailyAppointments = [];

  state.days.forEach((dayOfWeek) => {
    if (dayOfWeek.name === day) {
      dayOfWeek.appointments.forEach((id) => {
        dailyAppointments.push(state.appointments[id])
      })
    }
  })
  return dailyAppointments.length ? dailyAppointments : [];
}

/////////////////////////////////////////////////////////////////////////

export function getInterview (state, interview) {
  if (!interview) {
   return null;
 }
 const interviewer = state.interviewers[interview.interviewer];
 if (!interviewer) {
   return null;
 }
 return { ...interview, interviewer};
};

/////////////////////////////////////////////////////////////////////////

export function getInterviewersForDay(state, day) {

  const currentDay = state.days.find(({name}) => name === day)
  const interviewers = currentDay ? 
  currentDay.interviewers.map(appointmentId => state.interviewers[appointmentId]) 
  : []

  return interviewers;
};