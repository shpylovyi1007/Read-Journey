"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import css from "./RegistrationForm.module.css";
import clsx from "clsx";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegistrationForm() {
  const [passwordShow, setPasswordShow] = useState(false);

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
          <label className={css.label} htmlFor="name">
            Name:
          </label>
          <input
            className={clsx(css.input, css.name)}
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 30,
                message: "Name must be less than 30 characters",
              },
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            id="name"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

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

        <div className={css.buttonContainer}>
          <button className={css.button} type="submit">
            Registration
          </button>
          <Link className={css.link} href="">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
