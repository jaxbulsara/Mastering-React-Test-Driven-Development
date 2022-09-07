import React, {useState} from 'react';

export const AppointmentForm = ({
  selectableServices,
  service,
  today,
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
        today={today}
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

const TimeSlotTable = ({today, salonOpensAt, salonClosesAt}) => {
  const dates = weeklyDateValues(today);
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);

  return (
    <div class="time_slots">
      <span className="time_slots__cell time_slots__blank"></span>

      {dates.map(date => (
        <span class="time_slots__cell time_slots__date" key={date}>
          {toShortDate(date)}
        </span>
      ))}

      {timeSlots.map(timeSlot => (
        <span class="time_slots__cell time_slots__time" key={timeSlot}>
          {toTimeValue(timeSlot)}
        </span>
      ))}
    </div>
  );
};

const weeklyDateValues = startDate => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;

  return Array(7)
    .fill([midnight])
    .reduce((acc, _, i) => acc.concat([midnight + i * increment]));
};

const toShortDate = timestamp => {
  const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(' ');

  return `${day} ${dayOfMonth}`;
};

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;

  return Array(totalSlots)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + i * increment]));
};

const toTimeValue = timestamp =>
  new Date(timestamp).toTimeString().substring(0, 5);
