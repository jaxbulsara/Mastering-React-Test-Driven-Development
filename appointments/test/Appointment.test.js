import React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';

import {Appointment} from '../src/Appointment';

let container;
let customer;

describe('Appointment', () => {
  it("renders the customer's first name.", () => {
    customer = {firstName: 'Ashley'};
    container = document.createElement('div');

    const root = createRoot(container);

    act(() => {
      root.render(<Appointment customer={customer} />);
    });

    expect(container.textContent).toMatch('Ashley');
  });
});

describe('Appointment', () => {
  it("renders another customer's first name.", () => {
    customer = {firstName: 'Jordan'};
    container = document.createElement('div');

    const root = createRoot(container);

    act(() => {
      root.render(<Appointment customer={customer} />);
    });

    expect(container.textContent).toMatch('Jordan');
  });
});
