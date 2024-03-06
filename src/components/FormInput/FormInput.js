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

  const getPasswordType = () => {
    let type = "password";
    if (showPassword) {
      type = "text";
    } else {
      type = "password";
    }
    return type;
  };

  return (
    <>
      <div className="form-input">
        <label>{label}</label>
        <div style={{ width: "100%", position: "relative" }}>
          {inputProps.type === "password" && (
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}

          <input
            {...inputProps}
            onChange={onChange}
            className="input"
            onBlur={handleFocus}
            onFocus={() =>
              inputProps.name === "confirmPassword" && setFocused(true)
            }
            focused={focused.toString()}
            type={
              inputProps.name === "password"
                ? getPasswordType()
                : inputProps.type
            }
          />
        </div>

        <span className="error-msg">{errorMessage}</span>
      </div>
    </>
  );
};

export default FormInput;
