import React, {useState} from 'react';
import {Appointment} from './Appointment';

export const AppointmentsDayView = ({appointments}) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
    <div id="appointmentsDayView">
      <nav className="appointmentNav">
        {appointments.map((appointment, index) => (
          <div className="appointmentTime" key={appointment.startsAt}>
            <button
              type="button"
              onClick={() => setSelectedAppointment(index)}
            >
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </div>
        ))}
      </nav>
      <article className="appointmentWrapper">
        {appointments.length === 0 ? (
          <p>There are no appointments scheduled for today.</p>
        ) : (
          <Appointment {...appointments[selectedAppointment]} />
        )}
      </article>
    </div>
  );
};

const appointmentTimeOfDay = startsAt => {
  const [hour, minute] = new Date(startsAt).toTimeString().split(':');
  return `${hour}:${minute}`;
};
