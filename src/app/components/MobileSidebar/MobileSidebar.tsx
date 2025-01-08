"use client";

import { useAppDispatch } from "@/app/hooks";
import { logout } from "@/app/redux/auth/operations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import css from "./MobileSidebar.module.css";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className={`${css.sidebar} ${isOpen ? css.open : ""}`}>
      <div className={css.overlay} onClick={onClose}></div>
      <div className={css.content}>
        <button className={css.closeButton} onClick={onClose}>
          <svg width={28} height={28}>
            <use href="symbol-defs.svg#close"></use>
          </svg>
        </button>
        <nav className={css.nav}>
          <Link href="/home">Home</Link>
          <Link href="/library">My library</Link>
        </nav>
        <button onClick={handleLogout} className={css.logoutButton}>
          Log out
        </button>
      </div>
    </div>
  );
}
