import React from "react";
import PropTypes from "prop-types";

export const FormInput = ({ handleChange, label, id, ...rest }) => (
  <div>
    <input id={id} onChange={handleChange} {...rest} />
    {label ? (
      <label htmlFor={id} {...rest}>
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;

FormInput.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string
};
