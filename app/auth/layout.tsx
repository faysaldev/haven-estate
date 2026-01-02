import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#FFFFFF] rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;