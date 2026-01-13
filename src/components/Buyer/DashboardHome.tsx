"use client";
import Link from "next/link";
import { Calendar, MessageSquare, Building2 } from "lucide-react";
import { useGetBuyerRecentActivitiesQuery } from "@/src/redux/features/Buyer/buyers";

const DashboardHome = () => {
  const { data: recentActivities } = useGetBuyerRecentActivitiesQuery({});
  console.log(recentActivities);

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
        <div className="space-y-4">
          {recentActivities?.length > 0 ? (
            recentActivities?.map(
              (activity: {
                id: string;
                action: string;
                user: string;
                timestamp: string;
                details: string;
              }) => (
                <div
                  key={activity.id}
                  className="flex items-start p-4 bg-white rounded-lg border border-[#235C47]/10 hover:shadow-sm transition-shadow"
                >
                  <div className="mr-4 mt-1">
                    <div className="w-3 h-3 rounded-full bg-[#235C47]"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-[#235C47] truncate">
                        {activity.action}
                      </h3>
                      <span className="text-xs text-[#235C47]/60 whitespace-nowrap ml-2">
                        {new Date(activity.timestamp).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}{" "}
                        at{" "}
                        {new Date(activity.timestamp).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-[#235C47]/80 mt-1">
                      {activity.details}
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs px-2 py-1 bg-[#F9F7F6] text-[#235C47] rounded">
                        by {activity.user}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-[#235C47]/80 italic">
              No recent activities found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
