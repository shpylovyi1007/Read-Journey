"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./RegistrationForm.module.css";
import clsx from "clsx";
import { useState } from "react";
import { FormProps } from "../LoginForm/LoginForm";
import * as Yup from "yup";
import { register } from "@/app/redux/auth/operations";
import { useAppDispatch } from "@/app/hooks";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be less than 30 characters")
    .required("Name is required"),
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
  name: string;
  email: string;
  password: string;
}

interface ActionsRegister {
  resetForm: () => void;
}

export default function RegistrationForm({ onToggleForm }: FormProps) {
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useAppDispatch();

  const handlePasswordShow = () => {
    setPasswordShow((prev) => !prev);
  };

  const initialValues: FormData = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values: FormData, actions: ActionsRegister) => {
    dispatch(register(values));
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
            <label className={css.label} htmlFor="name">
              Name:
            </label>
            <Field
              className={clsx(css.input, css.name)}
              id="name"
              name="name"
              type="text"
            />
            <ErrorMessage name="name" component="span" />
          </div>

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

          <div className={css.buttonContainer}>
            <button className={css.button} type="submit">
              Registration
            </button>

            <button
              className={css.link}
              onClick={(e) => {
                e.preventDefault();
                onToggleForm();
              }}
            >
              Already have an account?
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
