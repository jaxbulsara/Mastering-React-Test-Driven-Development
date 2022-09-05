import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {act} from 'react-dom/test-utils';

import {createContainer} from './domManipulators';
import {CustomerForm} from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({render, container} = createContainer());
  });

  // Selectors
  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('customer').elements[name];

  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  // Common expectations
  const expectToBeTextInput = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  const itRendersAsATextBox = fieldName =>
    it('renders a text box.', () => {
      render(<CustomerForm />);
      expectToBeTextInput(field(fieldName));
    });

  const itIncludesTheExistingValue = fieldName =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{[fieldName]: 'value'}} />);
      expect(field(fieldName).value).toEqual('value');
    });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');

    itIncludesTheExistingValue('firstName');

    it('renders a label for the field', () => {
      render(<CustomerForm />);
      expect(labelFor('firstName')).not.toBeNull();
      expect(labelFor('firstName').textContent).toEqual('First name');
    });

    it('assigns an id that matches the label id to the field', () => {
      render(<CustomerForm />);
      expect(field('firstName').id).toEqual('firstName');
    });

    it('saves the existing value when submitted', () => {
      // expect.hasAssertions();

      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({firstName}) => expect(firstName).toEqual('Ashley')}
        />
      );

      ReactTestUtils.Simulate.submit(form('customer'));
    });

    it('saves new value when submitted', () => {
      expect.hasAssertions();

      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({firstName}) => expect(firstName).toEqual('Jamie')}
        />
      );

      act(() =>
        ReactTestUtils.Simulate.change(field('firstName'), {
          target: {value: 'Jamie'},
        })
      );
      ReactTestUtils.Simulate.submit(form('customer'));
    });
  });
});
