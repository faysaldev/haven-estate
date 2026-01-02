import React, { useState, useEffect, useRef } from "react";
import AuthForm from "./AuthForm";

interface OTPVerificationProps {
  email: string;
  onVerify: (otp: string) => void;
  onResendOTP: () => void;
  onBackToSignUp: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onVerify,
  onResendOTP,
  onBackToSignUp,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered and not the last input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle key down events
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      onVerify(otpCode);
    }
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    if (timeLeft === 0) {
      onResendOTP();
      setTimeLeft(300); // Reset timer to 5 minutes
    }
  };

  return (
    <AuthForm
      title="Verify Your Account"
      subtitle={`Enter the 6-digit code sent to ${email}`}
      onSubmit={handleSubmit}
      submitButtonText="Verify Account"
    >
      <div className="space-y-4">
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#235C47] focus:border-[#235C47]"
            />
          ))}
        </div>

        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-600">
              Resend code in <span className="font-medium">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-sm text-[#235C47] hover:text-[#1a4a38] font-medium"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={timeLeft > 0}
            className={`font-medium ${
              timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-[#235C47] hover:text-[#1a4a38]"
            }`}
          >
            Resend Code
          </button>
        </p>
        <p className="text-sm text-gray-600 pt-2">
          Go back to{" "}
          <button
            type="button"
            onClick={onBackToSignUp}
            className="font-medium text-[#235C47] hover:text-[#1a4a38]"
          >
            Sign Up
          </button>
        </p>
      </div>
    </AuthForm>
  );
};

export default OTPVerification;