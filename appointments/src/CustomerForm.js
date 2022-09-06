import React, {useState} from 'react';

export const CustomerForm = ({firstName, lastName, phoneNumber, onSubmit}) => {
  const [customer, setCustomer] = useState({firstName, lastName, phoneNumber});

  const handleChange = ({target}) =>
    setCustomer(customer => ({...customer, [target.name]: target.value}));

  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <TextField
        name="firstName"
        value={firstName}
        label="First name"
        onChange={handleChange}
      />
      <TextField
        name="lastName"
        value={lastName}
        label="Last name"
        onChange={handleChange}
      />
      <TextField
        name="phoneNumber"
        value={phoneNumber}
        label="Phone number"
        onChange={handleChange}
      />
    </form>
  );
};

const TextField = ({name, value, label, onChange}) => (
  <div class="text_field">
    <label htmlFor={name}>{label}</label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    />
  </div>
);
