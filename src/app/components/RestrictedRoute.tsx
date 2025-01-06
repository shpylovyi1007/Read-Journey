"use client";

import { useAppSelector } from "../hooks";
import Entrance from "../pages/UserEntrance/page";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";
export default function RestrictedRoute() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={"/home"} /> : Entrance;
}
