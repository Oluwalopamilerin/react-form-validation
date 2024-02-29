import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./FormInput.css";

const FormInput = (props) => {
  const { label, id, onChange, errorMessage, ...inputProps } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="form-input">
        <label>{label}</label>

        {inputProps.icon === "true" &&
          (showPassword ? (
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              <FaEyeSlash />
            </span>
          ) : (
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              <FaEye />
            </span>
          ))}
        <input
          {...inputProps}
          onChange={onChange}
          className="input"
          onBlur={handleFocus}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
          focused={focused.toString()}
          type={inputProps.icon === showPassword ? "text" : "password"}
        />

        <span className="error-msg">{errorMessage}</span>
      </div>
    </>
  );
};

export default FormInput;
