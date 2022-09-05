import React from 'react';

export const CustomerForm = ({firstName}) => {
  return (
    <form id="customer" action="">
      <input type="text" name="firstName" value={firstName} readOnly />
    </form>
  );
};
