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

  it('renders a form', () => {
    render(<AppointmentForm />);
    expect(form('appointment')).not.toBeNull();
    expect(form('appointment').className).toEqual('appointment_form');
  });

  describe('service field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />);

      const field = name => form('appointment').elements[name];

      expect(field('service')).not.toBeNull();
      expect(field('service').tagName).toEqual('SELECT');
    });
  });
});
