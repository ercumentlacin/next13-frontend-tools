"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import DrawerProvider from "./contexts/DrawerContext";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <DrawerProvider>{children}</DrawerProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </SessionProvider>
  );
};
