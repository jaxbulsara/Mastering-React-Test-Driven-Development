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
      <TextInput
        name="firstName"
        value={firstName}
        label="First name"
        onChange={handleChange}
      />

      <TextInput
        name="lastName"
        value={lastName}
        label="Last name"
        onChange={handleChange}
      />

      <TextInput
        name="phoneNumber"
        value={phoneNumber}
        label="Phone number"
        onChange={handleChange}
      />

      <input
        type="submit"
        className="customer_form__submit_button"
        value="Add"
      />
    </form>
  );
};

const TextInput = ({name, value, label, onChange}) => (
  <div class="customer_form__text_input">
    <label for={name} className="customer_form__text_input__label">
      {label}
    </label>
    <input
      type="input"
      name={name}
      id={name}
      className="customer_form__text_input__input"
      value={value}
      onChange={onChange}
    />
  </div>
);
