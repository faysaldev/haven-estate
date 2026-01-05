"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/src/components/Auth/FormInput";

interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real application, you would handle the authentication here
      console.log("Sign up submitted:", { ...formData, confirmPassword });

      // Redirect to OTP verification page after successful sign up
      router.push("/auth/otp-verification");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#235C47]">Create Account</h2>
        <p className="mt-2 text-gray-600">Create your account to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#FFFFFF] bg-[#235C47] hover:bg-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235C47]"
          >
            Sign Up
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
