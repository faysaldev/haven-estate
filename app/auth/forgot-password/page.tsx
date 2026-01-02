"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/src/components/Auth/FormInput";

interface FormData {
  email: string;
}

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real application, you would handle the password reset here
      console.log("Password reset requested for:", formData.email);
      alert("Password reset link sent to your email!");

      // Redirect back to sign in after successful request
      router.push("/auth/signin");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#235C47]">Reset Password</h2>
        <p className="mt-2 text-gray-600">
          Enter your email to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <FormInput
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
          label="Email Address"
          error={errors.email}
          required
        />

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#FFFFFF] bg-[#235C47] hover:bg-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235C47]"
          >
            Send Reset Link
          </button>
        </div>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => router.push("/auth/signin")}
          className="w-full py-2 px-4 border border-[#235C47] rounded-md shadow-sm text-sm font-medium text-[#235C47] bg-[#F9F7F6] hover:bg-[#e8e4e1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235C47]"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
