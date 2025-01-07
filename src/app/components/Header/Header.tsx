"use client";

import { useSelector } from "react-redux";
import css from "./Header.module.css";
import { selectUser } from "@/app/redux/auth/selectors";

export default function Header() {
  const user = useSelector(selectUser);

  const truncateName = (name: string | null, maxLength = 1) => {
    if (name !== null) {
      return `${name.slice(0, maxLength)}`;
    }
  };

  return (
    <div className={css.header}>
      <svg width={42} height={17}>
        <use href="./symbol-defs.svg#frame"></use>
      </svg>

      <div className={css.container}>
        <div className={css.user}>{truncateName(user.name)}</div>

        <button type="button" className={css.button}>
          <svg width={42} height={17}>
            <use href="./symbol-defs.svg#sidebar"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
