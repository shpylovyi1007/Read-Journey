"use client";

import { useEffect } from "react";
import Entrance from "./userEntrance/page";
import { useAppDispatch, useAppSelector } from "./hooks";
import { refrefhUser } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import RestrictedRoute from "./components/RestrictedRoute";

export default function Home() {
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refrefhUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Loader</div>
  ) : (
    <div>
      <RestrictedRoute component={<Entrance />} />
    </div>
  );
}
