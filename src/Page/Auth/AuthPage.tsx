"use client";

import React, { useState } from "react";
import SignUpForm from "@/src/components/Auth/SignUpForm";
import SignInForm from "@/src/components/Auth/SignInForm";
import ForgotPasswordForm from "@/src/components/Auth/ForgotPasswordForm";
import OTPVerification from "@/src/components/Auth/OTPVerification";

interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
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

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }

      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
      }

      if (confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (showForgotPassword && !formData.email) {
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real application, you would handle the authentication here
      console.log("Form submitted:", { ...formData, confirmPassword });

      // For signup, show OTP verification after successful form submission
      if (isSignUp && !showForgotPassword && !showOTPVerification) {
        setShowOTPVerification(true);
      } else {
        // Reset form after successful submission for non-signup forms
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
        });
        setConfirmPassword("");
      }
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real application, you would handle the password reset here
      console.log("Password reset requested for:", formData.email);
      alert("Password reset link sent to your email!");
      setShowForgotPassword(false);
      setFormData({
        ...formData,
        email: "",
      });
    }
  };

  const handleOTPVerify = (otp: string) => {
    // In a real application, you would verify the OTP with your backend
    console.log("Verifying OTP:", otp);
    alert("Account verified successfully!");

    // After successful verification, reset the form and go back to sign in
    setShowOTPVerification(false);
    setIsSignUp(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    });
    setConfirmPassword("");
  };

  const handleResendOTP = () => {
    // In a real application, you would resend the OTP to the user
    console.log("Resending OTP to:", formData.email);
    alert("OTP has been resent to your email!");
  };

  // Render the appropriate form based on the current state
  if (showForgotPassword) {
    return (
      <ForgotPasswordForm
        formData={{ email: formData.email }}
        errors={errors}
        onInputChange={handleInputChange}
        onSubmit={handleForgotPasswordSubmit}
        onBackToSignIn={() => {
          setShowForgotPassword(false);
          setIsSignUp(false);
        }}
      />
    );
  }

  if (showOTPVerification) {
    return (
      <OTPVerification
        email={formData.email}
        onVerify={handleOTPVerify}
        onResendOTP={handleResendOTP}
        onBackToSignUp={() => setShowOTPVerification(false)}
      />
    );
  }

  if (isSignUp) {
    return (
      <SignUpForm
        formData={formData}
        confirmPassword={confirmPassword}
        errors={errors}
        onInputChange={handleInputChange}
        onConfirmPasswordChange={(value) => {
          setConfirmPassword(value);
          if (errors.confirmPassword) {
            setErrors({
              ...errors,
              confirmPassword: "",
            });
          }
        }}
        onSubmit={handleSubmit}
        onBackToSignIn={() => setIsSignUp(false)}
      />
    );
  }

  return (
    <SignInForm
      formData={{ email: formData.email, password: formData.password }}
      errors={errors}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onSwitchToSignUp={() => setIsSignUp(true)}
      onForgotPassword={() => setShowForgotPassword(true)}
    />
  );
}

export default AuthPage;
