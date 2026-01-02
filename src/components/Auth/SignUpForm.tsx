import React from "react";
import AuthForm from "./AuthForm";
import FormInput from "./FormInput";

interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface SignUpFormProps {
  formData: FormData;
  confirmPassword: string;
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToSignIn: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  formData,
  confirmPassword,
  errors,
  onInputChange,
  onConfirmPasswordChange,
  onSubmit,
  onBackToSignIn,
}) => {
  return (
    <AuthForm
      title="Create Account"
      subtitle="Create your account to get started"
      onSubmit={onSubmit}
      submitButtonText="Sign Up"
    >
      <FormInput
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={onInputChange}
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
        onChange={onInputChange}
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
        onChange={onInputChange}
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
        onChange={onInputChange}
        placeholder="••••••••"
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
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        placeholder="••••••••"
        label="Confirm Password"
        error={errors.confirmPassword}
        required
        showPasswordToggle
      />

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onBackToSignIn}
            className="font-medium cursor-pointer text-[#235C47] hover:text-[#1a4a38] focus:outline-none"
          >
            Sign In
          </button>
        </p>
      </div>
    </AuthForm>
  );
};

export default SignUpForm;
