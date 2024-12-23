"use client";

import RegistrationForm from "@/app/components/RegistrationForm/RegistrationForm";
import { useState } from "react";
import UserEntrance from "./layout";
import LoginForm from "@/app/components/LoginForm/LoginForm";

export default function Entrance() {
  const [newUser, setNewUser] = useState(false);

  const handleLogin = () => {
    setNewUser((prev) => !prev);
  };

  return (
    <UserEntrance>
      {newUser ? (
        <LoginForm onToggleForm={handleLogin} />
      ) : (
        <RegistrationForm onToggleForm={handleLogin} />
      )}
    </UserEntrance>
  );
}
