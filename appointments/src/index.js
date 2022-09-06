import React from 'react';
import {createRoot} from 'react-dom/client';
import {AppointmentsDayView} from './AppointmentsDayView';
import {CustomerForm} from './CustomerForm';
import {sampleAppointments} from './sampleData';

const container = document.getElementById('root');
const root = createRoot(container);
// const component = <AppointmentsDayView appointments={sampleAppointments} />;
const component = <CustomerForm />;
root.render(component);
