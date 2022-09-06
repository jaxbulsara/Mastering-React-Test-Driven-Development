import React from 'react';
import {createRoot} from 'react-dom/client';
import {AppointmentsDayView} from './AppointmentsDayView';
import {CustomerForm} from './CustomerForm';
import {sampleAppointments} from './sampleData';

const container = document.getElementById('root');
const root = createRoot(container);
const component = <AppointmentsDayView appointments={sampleAppointments} />;
// const component = (
//   <CustomerForm
//     firstName="jay"
//     lastName="bulsara"
//     phoneNumber="12345"
//     onSubmit={props => null}
//   />
// );
root.render(component);
