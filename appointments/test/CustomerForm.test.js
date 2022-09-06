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

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('customer').elements[name];
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
    expect(form('customer').className).toEqual('customer_form');
  });

  const itRendersAsATextBox = fieldName =>
    it('renders a text box.', () => {
      render(<CustomerForm />);
      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName).tagName).toEqual('INPUT');
      expect(field(fieldName).type).toEqual('text');
      expect(field(fieldName).className).toEqual(
        'customer_form__text_input__input'
      );
    });

  const itPrefillsTheExistingValue = fieldName =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{[fieldName]: 'value'}} />);
      expect(field(fieldName).value).toEqual('value');
    });

  const itRendersALabel = (fieldName, value) =>
    it('renders a label for the field', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(value);
      expect(labelFor(fieldName).className).toEqual(
        'customer_form__text_input__label'
      );
    });

  const itAssignsAnIdToMatchLabelToField = (fieldName, fieldId) =>
    it('assigns an id that matches the label id to the field', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldId);
      expect(labelFor(fieldName).htmlFor).toEqual(fieldId);
    });

  const itSavesTheExistingValueWhenSubmitted = fieldName =>
    it('saves the existing value when submitted', () => {
      render(
        <CustomerForm
          {...{[fieldName]: 'existingValue'}}
          onSubmit={props => expect(props[fieldName]).toEqual('existingValue')}
        />
      );

      ReactTestUtils.Simulate.submit(form('customer'));
    });

  const itSavesANewValueWhenSubmitted = (fieldName, newValue) =>
    it('saves new value when submitted', () => {
      expect.hasAssertions();

      render(
        <CustomerForm
          {...{[fieldName]: 'existingValue'}}
          onSubmit={props => expect(props[fieldName]).toEqual(newValue)}
        />
      );

      act(() =>
        ReactTestUtils.Simulate.change(field(fieldName), {
          target: {value: newValue, name: fieldName},
        })
      );
      ReactTestUtils.Simulate.submit(form('customer'));
    });

  const itRendersInADiv = (fieldName, className) =>
    it('renders in a div', () => {
      render(<CustomerForm />);

      expect(field(fieldName).parentNode.tagName).toEqual('DIV');
      expect(field(fieldName).parentNode.className).toEqual(
        'customer_form__text_input'
      );
    });

  describe('first name field', () => {
    const fieldName = 'firstName';
    itRendersAsATextBox(fieldName);
    itPrefillsTheExistingValue(fieldName);
    itRendersALabel(fieldName, 'First name');
    itAssignsAnIdToMatchLabelToField(fieldName, fieldName);
    itSavesTheExistingValueWhenSubmitted(fieldName);
    itSavesANewValueWhenSubmitted(fieldName, fieldName);
    itRendersInADiv(fieldName, 'customer_form__text_input');
  });

  describe('last name field', () => {
    const fieldName = 'lastName';
    itRendersAsATextBox(fieldName);
    itPrefillsTheExistingValue(fieldName);
    itRendersALabel(fieldName, 'Last name');
    itAssignsAnIdToMatchLabelToField(fieldName, fieldName);
    itSavesTheExistingValueWhenSubmitted(fieldName);
    itSavesANewValueWhenSubmitted(fieldName, fieldName);
  });

  describe('phone number field', () => {
    const fieldName = 'phoneNumber';
    itRendersAsATextBox(fieldName);
    itPrefillsTheExistingValue(fieldName);
    itRendersALabel(fieldName, 'Phone number');
    itAssignsAnIdToMatchLabelToField(fieldName, fieldName);
    itSavesTheExistingValueWhenSubmitted(fieldName);
    itSavesANewValueWhenSubmitted(fieldName, fieldName);
  });

  it('has a submit button', () => {
    render(<CustomerForm />);

    const submitButton = container.querySelector('input[type="submit"]');
    expect(submitButton).not.toBeNull();
    expect(submitButton.className).toEqual('customer_form__submit_button');
  });
});
