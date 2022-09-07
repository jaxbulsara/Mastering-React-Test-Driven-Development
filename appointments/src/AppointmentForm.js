import React, {useState} from 'react';

export const AppointmentForm = ({
  selectableServices,
  service,
  salonOpensAt,
  salonClosesAt,
  onSubmit,
}) => {
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

      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
      />
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
  salonOpensAt: 9,
  salonClosesAt: 19,
};

const TimeSlotTable = ({salonOpensAt, salonClosesAt}) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);

  return (
    <div class="time_slots">
      {timeSlots.map(timeSlot => (
        <div class="time_slots__cell time_slots__time" key={timeSlot}>
          {toTimeValue(timeSlot)}
        </div>
      ))}
    </div>
  );
};

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;

  console.log(totalSlots, startTime, increment);

  return Array(totalSlots)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + i * increment]));
};

const toTimeValue = timestamp =>
  new Date(timestamp).toTimeString().substring(0, 5);
