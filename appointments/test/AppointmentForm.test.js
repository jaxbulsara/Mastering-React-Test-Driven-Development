import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {act} from 'react-dom/test-utils';

import {createContainer} from './domManipulators';
import {AppointmentForm} from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  let render, container;

  beforeEach(() => {
    ({render, container} = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('appointment').elements[name];
  const labelFor = formElement =>
    container.querySelector(`label[for=${formElement}]`);

  it('renders a form', () => {
    render(<AppointmentForm />);
    expect(form('appointment')).not.toBeNull();
    expect(form('appointment').className).toEqual('appointment_form');
  });

  describe('service field', () => {
    const findOption = (dropdownNode, textContent) => {
      const options = Array.from(dropdownNode.childNodes);
      return options.find(option => option.textContent === textContent);
    };

    it('renders as a select box', () => {
      render(<AppointmentForm />);

      expect(field('service')).not.toBeNull();
      expect(field('service').tagName).toEqual('SELECT');
    });

    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />);

      const firstNode = field('service').childNodes[0];
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    });

    it('lists all salon services', () => {
      const selectableServices = ['serviceA', 'serviceB'];

      render(<AppointmentForm selectableServices={selectableServices} />);

      const optionNodes = Array.from(field('service').childNodes);
      const renderedServices = optionNodes.map(node => node.textContent);

      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      );
    });

    it('pre-selects the existing value', () => {
      const selectableServices = ['serviceA', 'serviceB'];

      render(
        <AppointmentForm
          selectableServices={selectableServices}
          service="serviceB"
        />
      );

      const option = findOption(field('service'), 'serviceB');
      expect(option.selected).toBeTruthy();
    });

    it('renders a label for the field', () => {
      render(<AppointmentForm />);

      expect(labelFor('service')).not.toBeNull();
      expect(labelFor('service').textContent).toEqual('Service');
    });

    it('assigns an id that matches the label id', () => {
      render(<AppointmentForm />);

      expect(field('service').id).toEqual('service');
      expect(labelFor('service').htmlFor).toEqual('service');
    });

    it('saves the existing value when submitted', () => {
      expect.hasAssertions();

      const selectableServices = ['newValue', 'existingValue'];

      render(
        <AppointmentForm
          selectableServices={selectableServices}
          service="existingValue"
          onSubmit={props => expect(props['service']).toEqual('existingValue')}
        />
      );

      ReactTestUtils.Simulate.submit(form('appointment'));
    });

    it('saves new value when submitted', () => {
      expect.hasAssertions();

      const selectableServices = ['newValue', 'existingValue'];

      render(
        <AppointmentForm
          selectableServices={selectableServices}
          service="existingValue"
          onSubmit={props => expect(props['service']).toEqual('newValue')}
        />
      );

      act(() =>
        ReactTestUtils.Simulate.change(field('service'), {
          target: {value: 'newValue', name: 'service'},
        })
      );
      ReactTestUtils.Simulate.submit(form('appointment'));
    });
  });

  const expectEachElementToHaveClassName = (elementNodes, className) =>
    expect(Array.from(elementNodes).map(node => node.className)).toEqual(
      Array(4).fill(className)
    );

  describe('time slot table', () => {
    const timeSlotTable = () => container.querySelector('.time_slots');

    it('renders a container for the time slots', () => {
      render(<AppointmentForm />);

      expect(timeSlotTable()).not.toBeNull();
    });

    it('renders a time slot for every half hour between open and close times', () => {
      render(<AppointmentForm salonOpensAt={9} salonClosesAt={11} />);

      const timesOfDay = timeSlotTable().querySelectorAll('.time_slots__time');

      expect(timesOfDay).toHaveLength(4);
      expect(timesOfDay[0].textContent).toEqual('09:00');
      expect(timesOfDay[1].textContent).toEqual('09:30');
      expect(timesOfDay[3].textContent).toEqual('10:30');

      expectEachElementToHaveClassName(
        timesOfDay,
        'time_slots__cell time_slots__time'
      );
    });
  });
});
