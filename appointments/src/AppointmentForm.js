import React from 'react';

export const AppointmentForm = ({selectableServices}) => (
  <form id="appointment" class="appointment_form">
    <select name="service">
      <option />
      {selectableServices.map(s => (
        <option key={s}>{s}</option>
      ))}
    </select>
  </form>
);

AppointmentForm.defaultProps = {
  selectableServices: ['serviceA', 'serviceB', 'serviceC', 'serviceD'],
};
