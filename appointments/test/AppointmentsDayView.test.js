import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {AppointmentsDayView} from '../src/AppointmentsDayView';

describe('AppointmentsDayView', () => {
  let container;
  let root;

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

  it('has a button element in each list item.', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll('li > button')).toHaveLength(2);
    expect(container.querySelectorAll('li > button')[0].type).toEqual(
      'button'
    );
  });

  it('renders another appointment when selected.', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];

    act(() => ReactTestUtils.Simulate.click(button));
    expect(container.textContent).toMatch('Jordan');
  });
});
