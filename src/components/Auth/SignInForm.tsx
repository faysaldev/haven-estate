import React from "react";
import AuthForm from "./AuthForm";
import FormInput from "./FormInput";

interface FormData {
  email: string;
  password: string;
}

interface SignInFormProps {
  formData: FormData;
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  errors,
  onInputChange,
  onSubmit,
  onSwitchToSignUp,
  onForgotPassword,
}) => {
  return (
    <AuthForm
      title="Sign In"
      subtitle="Sign in to your account"
      onSubmit={onSubmit}
      submitButtonText="Sign In"
    >
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

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don{`'`}t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="font-medium cursor-pointer text-[#235C47] hover:text-[#1a4a38] focus:outline-none"
          >
            Sign Up
          </button>
        </p>
        <p className="text-sm text-gray-600">
          Forgot your password?{" "}
          <button
            type="button"
            onClick={onForgotPassword}
            className="font-medium cursor-pointer text-[#235C47] hover:text-[#1a4a38] focus:outline-none"
          >
            Reset Password
          </button>
        </p>
      </div>
    </AuthForm>
  );
};

export default SignInForm;
