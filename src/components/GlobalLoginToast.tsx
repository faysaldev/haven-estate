"use client";

import { useEffect } from "react";
import { LoginRequiredToast } from "@/src/components/property-details/LoginRequiredToast";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { hideLoginToast } from "@/src/redux/features/auth/authSlice";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";

export const GlobalLoginToast = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const showLoginToast = useAppSelector((state) => state.auth.showLoginToast);
  const loginToastAction = useAppSelector((state) => state.auth.loginToastAction);

  // If user logs in, automatically hide the toast
  useEffect(() => {
    if (user && showLoginToast) {
      dispatch(hideLoginToast());
    }
  }, [user, showLoginToast, dispatch]);

  const handleClose = () => {
    dispatch(hideLoginToast());
  };

  return (
    <LoginRequiredToast 
      show={showLoginToast} 
      action={loginToastAction} 
      onClose={handleClose} 
    />
  );
};