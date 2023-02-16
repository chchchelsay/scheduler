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

export function getInterview (state, interview) {
  console.log('state:', state);
 if (!interview) {
   return null;
 }
 const interviewer = state.interviewers[interview.interviewer];
 if (!interviewer) {
   return null;
 }
 return { ...interview, interviewer};
};