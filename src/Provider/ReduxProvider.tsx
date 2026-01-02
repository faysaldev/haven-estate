"use client"; // Ensures this component is only used on the client side

import { store } from "@/src/redux/store/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-right" />
    </Provider>
  );
};

export default ReduxProvider;
