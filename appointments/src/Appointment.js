import React from 'react';

export const Appointment = ({customer}) => <div>{customer.firstName}</div>;

export const AppointmentsDayView = ({appointments}) => (
  <div id="appointmentsDayView">
    <ol>
      {appointments.map(appointment => (
        <li key={appointment.startsAt}>
          {AppointmentTimeOfDay(appointment.startsAt)}
        </li>
      ))}
    </ol>
  </div>
);

const AppointmentTimeOfDay = startsAt => {
  const [hour, minute] = new Date(startsAt).toTimeString().split(':');
  return `${hour}:${minute}`;
};
