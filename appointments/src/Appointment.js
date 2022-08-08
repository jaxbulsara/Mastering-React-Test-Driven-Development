import React from 'react';

export const Appointment = ({startsAt, customer, stylist, service, notes}) => {
  return (
    <div class="appointment">
      <h1>Today's appointment at {appointmentTimeOfDay(startsAt)}</h1>
      <div className="appointmentInfo">
        <div className="infoRow">
          <div className="label">Name</div>
          <div className="value">
            {customer.firstName} {customer.lastName}
          </div>
        </div>
        <div className="infoRow">
          <div className="label">Phone</div>
          <div className="value">{customer.phoneNumber}</div>
        </div>
        <div className="infoRow">
          <div className="label">Stylist</div>
          <div className="value">{stylist}</div>
        </div>
        <div className="infoRow">
          <div className="label">Service</div>
          <div className="value">{service}</div>
        </div>
        <div className="infoRow">
          <div className="label">Notes</div>
          <div className="value">{notes}</div>
        </div>
      </div>
    </div>
  );
};

const appointmentTimeOfDay = startsAt => {
  const [hour, minute] = new Date(startsAt).toTimeString().split(':');
  return `${hour}:${minute}`;
};
