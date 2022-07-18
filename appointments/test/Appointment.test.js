import React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {Appointment} from '../src/Appointment';

let container;
let customer;
let root;

beforeEach(() => {
  container = document.createElement('div');
  root = createRoot(container);
});

describe('Appointment', () => {
  it("renders the customer's first name.", () => {
    customer = {firstName: 'Ashley'};

    act(() => {
      root.render(<Appointment customer={customer} />);
    });

    expect(container.textContent).toMatch('Ashley');
  });
});

describe('Appointment', () => {
  it("renders another customer's first name.", () => {
    customer = {firstName: 'Jordan'};

    act(() => {
      root.render(<Appointment customer={customer} />);
    });

    expect(container.textContent).toMatch('Jordan');
  });
});
