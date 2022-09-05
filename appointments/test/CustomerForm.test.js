import React from 'react';

import {createContainer} from './domManipulators';
import {CustomerForm} from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({render, container} = createContainer());
  });
});
