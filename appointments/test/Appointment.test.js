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
});
