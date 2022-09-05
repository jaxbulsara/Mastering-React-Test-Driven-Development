import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {act} from 'react-dom/test-utils';

import {createContainer} from './domManipulators';
import {AppointmentsDayView} from '../src/AppointmentsDayView';

describe('AppointmentsDayView', () => {
  let container, render;

  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: {
        firstName: 'Ashley',
        lastName: 'Stokes',
      },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: {
        firstName: 'Jordan',
        lastName: 'Mars',
      },
    },
  ];

  beforeEach(() => {
    ({render, container} = createContainer());
  });

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  });

  it('renders multiple appointments in a nav element.', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const appointmentNav = container.querySelector('nav.appointmentNav');

    expect(appointmentNav).not.toBeNull();
    expect(appointmentNav.children).toHaveLength(2);
  });

  it('renders each appointment time.', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const appointmentTimes = container.querySelectorAll(
      'nav > .appointmentTime'
    );

    expect(appointmentTimes).toHaveLength(2);
    expect(appointmentTimes[0].textContent).toEqual('12:00');
    expect(appointmentTimes[1].textContent).toEqual('13:00');
  });

  it('renders the selected appointment as an article.', () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(
      container.querySelector('article.appointmentWrapper')
    ).not.toBeNull();
  });

  it('initially shows a message saying there are no appointments today.', () => {
    render(<AppointmentsDayView appointments={[]} />);
    const appointment = container.querySelector('.appointmentWrapper');

    expect(appointment.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default.', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const appointment = container.querySelector('.appointmentWrapper');

    expect(appointment.textContent).toMatch('Ashley');
  });

  it('has a button element in each appointment time.', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(
      container.querySelectorAll('.appointmentTime > button')
    ).toHaveLength(2);
    expect(
      container.querySelectorAll('.appointmentTime > button')[0].type
    ).toEqual('button');
  });

  it('renders another appointment when selected.', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];

    act(() => ReactTestUtils.Simulate.click(button));
    expect(container.textContent).toMatch('Jordan');
  });
});
