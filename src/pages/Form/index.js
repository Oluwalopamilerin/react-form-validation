import React, { useState } from "react";
import FormInput from "../../components/FormInput/FormInput";

import { inputsArr } from "./Form.data";

import "./Form.css";

const Form = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) =>
    setValues(() => ({
      ...values,
      [e.target.name]: e.target.value,
    }));

  const inputs = inputsArr({ values });

  const errorMsg = inputs.map((input) =>
    input.type !== "birthday" ? input.errorMessage : null
  );

  const pattern = inputs.map((input) =>
    input.type !== "date" ? input.pattern : null
  );

  // const usernameRef = useRef();
  // console.log(usernameRef);
  // console.log("re-rendered");

  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validateInput = (values) => {
    const errors = {};
    const regex = pattern;

    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.birthday) {
      errors.birthday = "Birthday is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  validateInput(values);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    setFormErrors(validateInput(values));
    setIsSubmit(true);
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
        <button className="btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
