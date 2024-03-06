import React, { useState } from "react";
import FormInput from "../../components/FormInput/FormInput";

import { inputsArr } from "./Form.data";

import "./Form.css";

const usernameRegex = RegExp(/^[A-Za-z0-9]{3,16}$/);
const emailRegex = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/);
const passwordRegex = RegExp(
  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
);

const Form = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    errors: {
      username: "",
      email: "",
      birthday: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState("");

  const inputs = inputsArr({ values });

  const onChange = (e) => {
    const { name, value } = e.target;
    const errors = values.errors;

    switch (name) {
      case "username":
        errors.username = usernameRegex.test(value)
          ? ""
          : "Username should be 3-16 characters with no special characters.";
        break;
      case "email":
        errors.email = emailRegex.test(value)
          ? ""
          : "Enter a valid email address.";
        break;
      case "password":
        errors.password = passwordRegex.test(value)
          ? ""
          : "Password should be 8-20 characters and include at least a number, letter, and special character.";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value === values.password ? "" : "Password does not match.";
        break;
      default:
        break;
    }
    setValues(() => ({
      ...values,
      errors,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const isFormValues =
    values?.username &&
    values?.email &&
    values?.birthday &&
    values?.password &&
    values?.confirmPassword;
  console.log(isFormValues);

  const isFormErrors =
    values?.errors?.username ||
    values?.errors?.email ||
    values?.errors?.birthday ||
    values?.errors?.password ||
    values?.errors?.confirmPassword;

  const isDisableButton = !isFormValues || isFormErrors;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (
        existingUsers.some((v) => {
          return v.email === values.email;
        })
      ) {
        alert("Email already exists");
      } else {
        existingUsers.push(values);
        const serializedData = JSON.stringify(existingUsers);
        localStorage.setItem("users", serializedData);
      }

      setValues({
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: "",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="form-body">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <h2 className="title">Register</h2>
        {inputs?.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="btn" disabled={isDisableButton || loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
