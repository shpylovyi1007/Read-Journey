"use client";

import { useAppSelector } from "../hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../redux/auth/selectors";

export default function PrivateRoute({
  component,
}: {
  component: React.ReactNode;
}) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return isLoggedIn ? component : null;
}
