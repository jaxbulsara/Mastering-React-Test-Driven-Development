import React, {useState} from 'react';

export const CustomerForm = ({firstName, lastName, phoneNumber, onSubmit}) => {
  const [customer, setCustomer] = useState({firstName, lastName, phoneNumber});

  const handleChange = ({target}) =>
    setCustomer(customer => ({...customer, [target.name]: target.value}));

  return (
    <form
      id="customer"
      className="customer_form"
      onSubmit={() => onSubmit(customer)}
    >
      <label className="customer_form__label" htmlFor="firstName">
        First name
      </label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        className="customer_form__text_input"
        value={firstName}
        onChange={handleChange}
      />

      <label className="customer_form__label" htmlFor="lastName">
        Last name
      </label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        className="customer_form__text_input"
        value={lastName}
        onChange={handleChange}
      />

      <label className="customer_form__label" htmlFor="phoneNumber">
        Phone number
      </label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        className="customer_form__text_input"
        value={phoneNumber}
        onChange={handleChange}
      />

      <input type="submit" value="Add" />
    </form>
  );
};
