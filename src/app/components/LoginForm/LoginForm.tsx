"use client";

import clsx from "clsx";
import * as Yup from "yup";
import css from "../RegistrationForm/RegistrationForm.module.css";
import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { login } from "@/app/redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
});

interface FormData {
  email: string;
  password: string;
}

interface ActionsLogin {
  resetForm: () => void;
}

export interface FormProps {
  onToggleForm: () => void;
}

export default function LoginForm({ onToggleForm }: FormProps) {
  const dispatch = useAppDispatch();

  const [passwordShow, setPasswordShow] = useState(false);

  const handlePasswordShow = () => {
    setPasswordShow((prev) => !prev);
  };

  const initialValues: FormData = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: FormData, actions: ActionsLogin) => {
    dispatch(login(values));
    actions.resetForm();
  };
  return (
    <div className={css.container}>
      <svg width={42} height={17}>
        <use href="./symbol-defs.svg#frame"></use>
      </svg>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <h1 className={css.title}>
            Expand your mind, reading <span className={css.span}>a book</span>
          </h1>

          <div className={css.inputContainer}>
            <label className={css.label} htmlFor="email">
              Email:
            </label>
            <Field
              className={clsx(css.input, css.email)}
              id="email"
              name="email"
              type="email"
            />
            <ErrorMessage name="email" component="span" />
          </div>

          <div className={clsx(css.inputContainer, css.passwordContainer)}>
            <label className={css.label} htmlFor="password">
              Password:
            </label>
            <Field
              className={css.input}
              id="password"
              name="password"
              type={passwordShow ? "text" : "password"}
            />
            <ErrorMessage name="password" component="span" />

            <button
              className={css.passwordShow}
              type="button"
              onClick={handlePasswordShow}
            >
              {passwordShow ? (
                <svg width={20} height={20}>
                  <use href="/symbol-defs.svg#eye"></use>
                </svg>
              ) : (
                <svg width={20} height={20}>
                  <use href="/symbol-defs.svg#eye-off"></use>
                </svg>
              )}
            </button>
          </div>

          <div className={clsx(css.buttonContainer, css.buttonContainerLogin)}>
            <button className={clsx(css.button, css.buttonLogin)} type="submit">
              Log in
            </button>
            <button
              className={css.link}
              onClick={(e) => {
                e.preventDefault();
                onToggleForm();
              }}
            >
              Don&#39;t have an account?
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
