"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookingCancelPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const bookingId = useState(
    () => `#BK-${Math.floor(Math.random() * 1000000)}`
  )[0];

  useEffect(() => {
    // Countdown timer
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto redirect to home after 5 seconds
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Cancel Icon */}
        <div className="mx-auto flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#F9F7F6] flex items-center justify-center mx-auto">
              <svg
                className="w-12 h-12 text-[#235C47]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#235C47] flex items-center justify-center animate-ping opacity-20">
              <div className="w-6 h-6 rounded-full bg-[#235C47]"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#235C47] mb-4">
          Booking Cancelled
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Your booking has been cancelled successfully. A confirmation email has
          been sent to your inbox.
        </p>

        {/* Booking Details Card */}
        <div className="bg-[#F9F7F6] rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-[#235C47] mb-4">
            Cancellation Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-medium">{bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-red-600">Cancelled</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-[#235C47] text-white font-medium rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#235C47] focus:ring-opacity-50"
          >
            Go Home
          </Link>
          <Link
            href="/bookings"
            className="px-8 py-3 bg-[#F9F7F6] text-[#235C47] font-medium rounded-lg hover:bg-opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#235C47] focus:ring-opacity-50"
          >
            View Bookings
          </Link>
        </div>

        {/* Countdown Timer */}
        <p className="mt-6 text-gray-500 text-sm">
          Redirecting to home in{" "}
          <span className="font-medium text-[#235C47]">{countdown}</span>{" "}
          seconds...
        </p>
      </div>
    </div>
  );
}
