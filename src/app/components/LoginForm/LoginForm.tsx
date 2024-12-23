"use client";

import clsx from "clsx";
import * as React from "react";
import { useForm } from "react-hook-form";
import css from "../RegistrationForm/RegistrationForm.module.css";

interface FormData {
  email: string;
  password: string;
}

export interface FormProps {
  onToggleForm: () => void;
}

export default function LoginForm({ onToggleForm }: FormProps) {
  const [passwordShow, setPasswordShow] = React.useState(false);

  const handlePasswordShow = () => {
    setPasswordShow((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <div className={css.container}>
      <svg width={42} height={17}>
        <use href="./symbol-defs.svg#frame"></use>
      </svg>

      <form className={css.form} onSubmit={onSubmit}>
        <h1 className={css.title}>
          Expand your mind, reading <span className={css.span}>a book</span>
        </h1>

        <div className={css.inputContainer}>
          <label className={css.label} htmlFor="email">
            Email:
          </label>
          <input
            className={clsx(css.input, css.email)}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            id="email"
            type="email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className={clsx(css.inputContainer, css.passwordContainer)}>
          <label className={css.label} htmlFor="password">
            Password:
          </label>
          <input
            className={css.input}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number",
              },
            })}
            id="password"
            type={passwordShow ? "text" : "password"}
          />
          {errors.password && <span>{errors.password.message}</span>}

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
      </form>
    </div>
  );
}
