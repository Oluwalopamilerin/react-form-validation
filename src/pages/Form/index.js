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

  const inputs = inputsArr({ values });

  // const usernameRef = useRef();
  // console.log(usernameRef);
  // console.log("re-rendered");

  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    setLoading(!loading);
    loading
      ? (e.target.textContent = "Submitting")
      : (e.target.textContent = "Submit");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
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

  const onChange = (e) =>
    setValues(() => ({
      ...values,
      [e.target.name]: e.target.value,
    }));

  return (
    <div className="form-body">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">Register</h2>
        {inputs?.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Form;
