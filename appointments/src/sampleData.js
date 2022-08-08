const today = new Date();

const at = hours => today.setHours(hours, 0);

export const sampleAppointments = [
  {startsAt: at(9), customer: {firstName: 'Ashley'}},
  {startsAt: at(10), customer: {firstName: 'Jordan'}},
  {startsAt: at(11), customer: {firstName: 'Austin'}},
  {startsAt: at(12), customer: {firstName: 'Mary'}},
  {startsAt: at(13), customer: {firstName: 'Maurice'}},
  {startsAt: at(14), customer: {firstName: 'Daniel'}},
  {startsAt: at(15), customer: {firstName: 'Margaret'}},
  {startsAt: at(16), customer: {firstName: 'Melissa'}},
  {startsAt: at(17), customer: {firstName: 'Tim'}},
];
