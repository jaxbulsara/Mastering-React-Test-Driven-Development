import React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {Appointment, AppointmentsDayView} from '../src/Appointment';

describe('Appointment', () => {
  let container;
  let customer;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    root = createRoot(container);
  });

  const render = component => {
    act(() => root.render(component));
  };

  it("renders the customer's first name.", () => {
    customer = {firstName: 'Ashley'};
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Ashley');
  });

  it("renders another customer's first name.", () => {
    customer = {firstName: 'Jordan'};
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Jordan');
  });
});

describe('AppointmentsDayView', () => {
  let container;
  let root;

  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: {firstName: 'Ashley'},
    },
    {
      startsAt: today.setHours(13, 0),
      customer: {firstName: 'Jordan'},
    },
  ];

  beforeEach(() => {
    container = document.createElement('div');
    root = createRoot(container);
  });

  const render = component => {
    act(() => root.render(component));
  };

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  });

  it('renders multiple appointments as an ordered list.', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ol').children).toHaveLength(2);

    expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
    expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
  });

  it('renders each appointment time as a list item.', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
    expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments today.', () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default.', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.textContent).toMatch('Ashley');
  });
});
