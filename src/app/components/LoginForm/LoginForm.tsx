"use client";

import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          placeholder="Email:"
          type="email"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input
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
          placeholder="Password:"
          type="password"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <button type="submit">Log in</button>
        <Link href="">Don&#39;t have an account?</Link>
      </div>
    </form>
  );
}
