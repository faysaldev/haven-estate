"use client";

import React, { ReactElement, ReactNode } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  selectCurrentUser,
  selectToken,
} from "../redux/features/auth/authSlice";

interface ProtectedProviderProps {
  children: ReactElement | ReactNode;
  allowedRoles: ("user" | "admin")[];
}

const ProtectedProvider: React.FC<ProtectedProviderProps> = ({
  children,
  allowedRoles,
}) => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const router = useRouter();
  const isAuthenticated = !!token && !!user;
  let hasRequiredRole = false;
  if (user?.role) {
    if (Array.isArray(user.role)) {
      hasRequiredRole = user.role.some((userRole: "user" | "admin") =>
        allowedRoles.includes(userRole)
      );
    } else {
      hasRequiredRole = allowedRoles.includes(user.role);
    }
  }
  if (!isAuthenticated || !hasRequiredRole) {
    if (typeof window !== "undefined") {
      router.replace("/auth/signin");
    }
    return null;
  }

  return <>{children}</>;
};

export default ProtectedProvider;
