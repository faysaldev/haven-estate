/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/src/components/Auth/FormInput";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";

interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const [createUser, { isLoading, isError, error }] = useRegisterMutation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null); // Clear any previous API errors

    if (validateForm()) {
      try {
        // Call the createUser mutation with the required data format
        const result = await createUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
        }).unwrap();

        console.log("User created successfully:", result);

        // Redirect to OTP verification page after successful sign up
        router.push(
          "/auth/otp-verification?email=" + encodeURIComponent(formData.email)
        );
      } catch (error: any) {
        console.error("Sign up failed:", error);
        // Set the API error to display to the user
        setApiError(error.data?.error || "An error occurred during sign up");
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#235C47]">Create Account</h2>
        <p className="mt-2 text-gray-600">Create your account to get started</p>
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
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="John Doe"
          label="Full Name"
          error={errors.name}
          required
        />

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
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="+1 (555) 123-4567"
          label="Phone Number"
          error={errors.phoneNumber}
          required
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••••••••"
          label="Password"
          error={errors.password}
          required
          showPasswordToggle
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) {
              setErrors({
                ...errors,
                confirmPassword: "",
              });
            }
          }}
          placeholder="••••••••••••••"
          label="Confirm Password"
          error={errors.confirmPassword}
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
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/auth/signin")}
            className="font-medium underline text-[#235C47] hover:text-[#1a4a38] focus:outline-none"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
