"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import dynamic from "next/dynamic";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default dynamic(() => Promise.resolve(Providers), { ssr: false });
