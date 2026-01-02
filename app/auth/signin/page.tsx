"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/src/components/Auth/FormInput";

interface FormData {
  email: string;
  password: string;
}

const SignInPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
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

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real application, you would handle the authentication here
      console.log("Sign in submitted:", formData);

      // Redirect to dashboard or home page after successful sign in
      // router.push('/dashboard');
      alert("Sign in successful!");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#235C47]">Sign In</h2>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
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

        <FormInput
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
          label="Password"
          error={errors.password}
          required
          showPasswordToggle
        />

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#FFFFFF] bg-[#235C47] hover:bg-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235C47]"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don{`'`}t have an account?{" "}
          <button
            onClick={() => router.push("/auth/signup")}
            className="font-medium cursor-pointer text-[#235C47] hover:text-[#1a4a38] focus:outline-none"
          >
            Sign Up
          </button>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Forgot your password?{" "}
          <button
            onClick={() => router.push("/auth/forgot-password")}
            className="font-medium text-[#235C47] hover:text-[#1a4a38] focus:outline-none"
          >
            Reset Password
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
