import React, {useState} from 'react';

export const AppointmentForm = ({
  selectableServices,
  service,
  today,
  salonOpensAt,
  salonClosesAt,
  availableTimeSlots,
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
      className="appointment_form"
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
        availableTimeSlots={availableTimeSlots}
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
  today: new Date(),
  salonOpensAt: 9,
  salonClosesAt: 19,
  availableTimeSlots: [],
};

const TimeSlotTable = ({
  today,
  salonOpensAt,
  salonClosesAt,
  availableTimeSlots,
}) => {
  const dates = weeklyDateValues(today);
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);

  return (
    <div className="time_slots">
      <div className="time_slots__dates_wrapper">
        {dates.map(date => (
          <span className="time_slots__cell time_slots__date" key={date}>
            {toShortDate(date)}
          </span>
        ))}
      </div>

      <div className="time_slots__times_wrapper">
        {timeSlots.map(timeSlot => (
          <div className="time_slots__cell time_slots__time" key={timeSlot}>
            {toTimeValue(timeSlot)}
          </div>
        ))}
      </div>

      <div className="time_slots__choices_wrapper">
        {timeSlots.map(timeSlot =>
          dates.map(date =>
            availableTimeSlots.some(
              availableTimeSlot =>
                availableTimeSlot.startsAt === mergeDateAndTime(date, timeSlot)
            ) ? (
              <label
                className="time_slots__cell time_slots__available"
                key={mergeDateAndTime(date, timeSlot)}
              >
                <input type="radio" />
              </label>
            ) : (
              <span
                className="time_slots__cell time_slots__unavailable"
                key={mergeDateAndTime(date, timeSlot)}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

const weeklyDateValues = startDate => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;

  return timeIncrements(7, midnight, increment);
};

const toShortDate = timestamp => {
  const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(' ');

  return `${day} ${dayOfMonth}`;
};

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;

  return timeIncrements(totalSlots, startTime, increment);
};

const toTimeValue = timestamp =>
  new Date(timestamp).toTimeString().substring(0, 5);

const timeIncrements = (numTimes, startTime, increment) =>
  Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + i * increment]));

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot);

  return new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  );
};
