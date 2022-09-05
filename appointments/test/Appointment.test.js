import React from 'react';

import {createContainer} from './domManipulators';
import {Appointment} from '../src/Appointment';

describe('Appointment', () => {
  let render, container;
  let customer;

  const today = new Date();
  const appointment = {
    startsAt: today.setHours(12, 0),
    customer: {
      firstName: 'Ashley',
      lastName: 'Stokes',
      phoneNumber: '(123) 456-7890',
    },
    stylist: 'Denise',
    service: 'Haircut',
    notes: 'Cut short',
  };

  beforeEach(() => {
    ({render, container} = createContainer());
  });

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

  it('renders the appointment header with time.', () => {
    render(<Appointment {...appointment} />);
    expect(container.textContent).toMatch("Today's appointment at 12:00");
  });

  it('renders the customer info in a div with rows.', () => {
    render(<Appointment {...appointment} />);

    expect(container.querySelector('.appointmentInfo')).not.toBeNull();
    expect(
      container.querySelectorAll('.appointmentInfo > .infoRow').length
    ).toBeGreaterThan(0);
  });

  it('renders each info row with a label and value.', () => {
    render(<Appointment {...appointment} />);

    expect(container.querySelector('.infoRow > .label')).not.toBeNull();
    expect(container.querySelector('.infoRow > .value')).not.toBeNull();
  });

  it("renders the customer's full name next to the 'Name' label.", () => {
    render(<Appointment {...appointment} />);

    const nameRow = container.querySelectorAll(
      '.appointmentInfo > .infoRow'
    )[0];
    expect(nameRow.querySelector('.label').textContent).toEqual('Name');
    expect(nameRow.querySelector('.value').textContent).toEqual(
      'Ashley Stokes'
    );
  });

  it("renders the customer's phone number.", () => {
    render(<Appointment {...appointment} />);

    expect(container.textContent).toMatch('Phone(123) 456-7890');
  });

  it("renders the customer's stylist.", () => {
    render(<Appointment {...appointment} />);

    expect(container.textContent).toMatch('StylistDenise');
  });

  it('renders the service to be performed.', () => {
    render(<Appointment {...appointment} />);

    expect(container.textContent).toMatch('ServiceHaircut');
  });

  it('renders the notes for the appointment.', () => {
    render(<Appointment {...appointment} />);

    expect(container.textContent).toMatch('NotesCut short');
  });
});
