import React from "react";
import AuthForm from "./AuthForm";
import FormInput from "./FormInput";

interface FormData {
  email: string;
}

interface ForgotPasswordFormProps {
  formData: FormData;
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToSignIn: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  formData,
  errors,
  onInputChange,
  onSubmit,
  onBackToSignIn,
}) => {
  return (
    <AuthForm
      title="Reset Password"
      subtitle="Enter your email to reset your password"
      onSubmit={onSubmit}
      submitButtonText="Send Reset Link"
      showSubmitButton={true}
      additionalButtons={
        <button
          type="button"
          onClick={onBackToSignIn}
          className="w-full py-2 px-4 border border-[#235C47] rounded-md shadow-sm text-sm font-medium text-[#235C47] bg-[#F9F7F6] hover:bg-[#e8e4e1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235C47]"
        >
          Back to Sign In
        </button>
      }
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
    </AuthForm>
  );
};

export default ForgotPasswordForm;