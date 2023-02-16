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