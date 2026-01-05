"use client";

import Link from "next/link";
import { Calendar, MessageSquare, Building2 } from "lucide-react";

const BuyerDashboard = () => {
  const quickActions = [
    {
      title: "Schedule Viewing",
      description: "Book a time to view a property",
      icon: Calendar,
      path: "/buyer/schedule-viewing",
      color: "bg-[#235C47]/10 text-[#235C47]",
    },
    {
      title: "Request Info",
      description: "Get more information about a property",
      icon: MessageSquare,
      path: "/buyer/request-info",
      color: "bg-[#235C47]/10 text-[#235C47]",
    },
    {
      title: "Book Property",
      description: "Reserve a property for purchase",
      icon: Building2,
      path: "/buyer/book-property",
      color: "bg-[#235C47]/10 text-[#235C47]",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">
          Buyer Dashboard
        </h1>
        <p className="text-[#235C47]/80 mt-2">
          Welcome to your property management dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.path}
              className={`p-6 rounded-xl border border-[#235C47]/20 hover:shadow-md transition-shadow ${action.color} hover:bg-[#235C47]/20`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#235C47]">
                    {action.title}
                  </h3>
                  <p className="text-sm text-[#235C47]/70">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-[#F9F7F6] p-6 rounded-xl border border-[#235C47]/20">
        <h2 className="text-xl font-semibold text-[#235C47] mb-4">
          Recent Activity
        </h2>
        <p className="text-[#235C47]/80">
          Your recent activities will appear here.
        </p>
      </div>
    </div>
  );
};

export default BuyerDashboard;
