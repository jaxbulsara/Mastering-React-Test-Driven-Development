import React from 'react';

export const Appointment = ({customer}) => <div>{customer.firstName}</div>;

export const AppointmentsDayView = ({appointments}) => (
  <div id="appointmentsDayView">
    <ol>
      {appointments.map(appointment => (
        <li key={appointment.startsAt}>
          <button type="button">
            {AppointmentTimeOfDay(appointment.startsAt)}
          </button>
        </li>
      ))}
    </ol>
    {appointments.length === 0 ? (
      <p>There are no appointments scheduled for today.</p>
    ) : (
      <Appointment {...appointments[0]} />
    )}
  </div>
);

const AppointmentTimeOfDay = startsAt => {
  const [hour, minute] = new Date(startsAt).toTimeString().split(':');
  return `${hour}:${minute}`;
};
