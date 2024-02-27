import React, { useState } from "react";

import "./FormInput.css";

const FormInput = (props) => {
  const { label, id, onChange, errorMessage, ...inputProps } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="form-input">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        className="input"
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="error-msg">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
