import React, {useState} from 'react';

export const AppointmentForm = ({selectableServices, service, onSubmit}) => {
  const [appointment, setAppointment] = useState({service});

  const handleChange = ({target}) => {
    setAppointment(appointment => ({
      ...appointment,
      [target.name]: target.value,
    }));
  };

  return (
    <form
      id="appointment"
      class="appointment_form"
      onSubmit={() => onSubmit(appointment)}
    >
      <label htmlFor="service">Service</label>
      <select
        name="service"
        id="service"
        value={service}
        onChange={handleChange}
      >
        <option />
        {selectableServices.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <TimeSlotTable />
    </form>
  );
};

AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions',
  ],
};

const TimeSlotTable = () => {
  return <div class="time_slots"></div>;
};
