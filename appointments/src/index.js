import React from 'react';
import {createRoot} from 'react-dom/client';
import {AppointmentsDayView} from './AppointmentsDayView';
import {CustomerForm} from './CustomerForm';
import {AppointmentForm} from './AppointmentForm';
import {sampleAppointments, sampleAvailableTimeSlots} from './sampleData';

const container = document.getElementById('root');
const root = createRoot(container);

const appointmentDayViewComponent = (
  <AppointmentsDayView appointments={sampleAppointments} />
);

const customerFormComponent = (
  <CustomerForm
    firstName="jay"
    lastName="bulsara"
    phoneNumber="12345"
    onSubmit={props => null}
  />
);

const appointmentFormComponent = (
  <AppointmentForm availableTimeSlots={sampleAvailableTimeSlots} />
);

root.render(appointmentFormComponent);
