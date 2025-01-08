"use client";

import css from "./Header.module.css";
import { selectUser } from "@/app/redux/auth/selectors";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import Link from "next/link";

export default function Header() {
  const user = useAppSelector(selectUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const truncateName = (name: string | null, maxLength = 1) => {
    if (name !== null) {
      return `${name.slice(0, maxLength)}`;
    }
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className={css.header}>
        <Link href={"/home"}>
          <svg width={42} height={17}>
            <use href="./symbol-defs.svg#frame"></use>
          </svg>
        </Link>

        <div className={css.container}>
          <div className={css.user}>{truncateName(user.name)}</div>

          <button
            type="button"
            className={css.button}
            onClick={handleOpenSidebar}
          >
            <svg width={42} height={17}>
              <use href="./symbol-defs.svg#sidebar"></use>
            </svg>
          </button>
        </div>
      </div>
      <MobileSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
    </>
  );
}
