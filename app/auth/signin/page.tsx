/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/src/components/Auth/FormInput";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
}

const SignInPage = () => {
  const router = useRouter();
  const [loginUser, { isLoading, isError, error }] = useLoginMutation();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (validateForm()) {
      try {
        const result = await loginUser({
          email: formData.email,
          password: formData.password,
          fcmToken: "fms demo...",
        }).unwrap();

        console.log("Sign in successful:", result);
        router.push("/admin");
      } catch (error: any) {
        if (
          error.data?.error ==
          "Email is not verified. Please check your email to verify."
        ) {
          router.push(
            "/auth/otp-verification?email=" + encodeURIComponent(formData.email)
          );
          toast.error(
            "Email is not verified. Please check your email to verify."
          );
        } else {
          setApiError(error.data?.error || "An error occurred during sign in");
        }
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#235C47]">Sign In</h2>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {apiError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}

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
            disabled={isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#FFFFFF] ${
              isLoading
                ? "bg-[#cccccc] cursor-not-allowed"
                : "bg-[#235C47] hover:bg-[#1a4a38]"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235C47]`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don{`'`}t have an account?{" "}
          <button
            onClick={() => router.push("/auth/signup")}
            className="font-medium underline cursor-pointer text-[#235C47] hover:text-[#1a4a38] focus:outline-none"
          >
            Sign Up
          </button>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Forgot your password?{" "}
          <button
            onClick={() => router.push("/auth/forgot-password")}
            className="font-medium underline text-[#235C47] hover:text-[#1a4a38] focus:outline-none"
          >
            Reset Password
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
