"use client";

import { useSelector } from "react-redux";
import css from "./Header.module.css";
import { selectUser } from "@/app/redux/auth/selectors";

export default function Header() {
  const user = useSelector(selectUser);
  return (
    <div className={css.header}>
      <svg width={42} height={17}>
        <use href="./symbol-defs.svg#frame"></use>
      </svg>

      <div>{user.name} </div>

      <button type="button">
        <svg width={42} height={17}>
          <use href="./symbol-defs.svg#sidebar"></use>
        </svg>
      </button>
    </div>
  );
}
