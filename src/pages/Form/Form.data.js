export const inputsArr = ({ values }) => {
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: values?.errors?.username,
      //   "Username should be 3-16 characters with no special characters.",
      label: "Username",
      // pattern: "^[A-Za-z0-9]{3,16}$",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "user@gmail.com",
      errorMessage: values?.errors?.email,
      // "Enter a valid email address.",
      label: "Email",
      // pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      errorMessage: "",
      label: "Birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: values?.errors?.password,
      // errorMessage:
      //   "Password should be 8-20 characters and include at least a number, letter, and special character.",
      label: "Password",
      // pattern:
      //    "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: values?.errors?.confirmPassword,
      // errorMessage: "Passwords don't match",
      label: "Confirm Password",
      // pattern: values.password,
    },
  ];

  return inputs;
};
