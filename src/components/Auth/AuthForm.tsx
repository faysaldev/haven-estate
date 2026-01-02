import React from "react";

interface AuthFormProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  showSubmitButton?: boolean;
  additionalButtons?: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  children,
  onSubmit,
  submitButtonText,
  showSubmitButton = true,
  additionalButtons,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#FFFFFF] rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#235C47]">{title}</h2>
          <p className="mt-2 text-gray-600">{subtitle}</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          {children}
          
          {showSubmitButton && (
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#FFFFFF] bg-[#235C47] hover:bg-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235C47]"
              >
                {submitButtonText}
              </button>
            </div>
          )}
          
          {additionalButtons && <div className="pt-4">{additionalButtons}</div>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;