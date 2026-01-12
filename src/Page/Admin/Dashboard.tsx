/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Building2, Calendar, MessageSquare, Eye } from "lucide-react";
import { StatsGrid } from "@/src/components/dashboard/StatsGrid";
import {
  useGetDashboardStatsQuery,
  useGetRecentActivitiesQuery,
  useGetTopPropertiesViewQuery,
} from "@/src/redux/features/Admin/Dashboard/dashboardApi";

const Dashboard = () => {
  const {
    data: dashboardStats,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetDashboardStatsQuery({});
  const {
    data: recentActivity,
    isLoading: activityLoading,
    isError: activityError,
  } = useGetRecentActivitiesQuery({});
  const {
    data: topProperties,
    isLoading: propertiesLoading,
    isError: propertiesError,
  } = useGetTopPropertiesViewQuery({});

  // Handle loading states
  if (statsLoading || activityLoading || propertiesLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#235C47] mb-2">
            Dashboard
          </h1>
          <p className="text-[#235C47]/70">
            Welcome to Haven Estates Admin Panel
          </p>
        </div>
        <div className="text-center py-10 text-[#235C47]">
          Loading dashboard data...
        </div>
      </div>
    );
  }

  // Handle error states
  if (statsError || activityError || propertiesError) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#235C47] mb-2">
            Dashboard
          </h1>
          <p className="text-[#235C47]/70">
            Welcome to Haven Estates Admin Panel
          </p>
        </div>
        <div className="text-center py-10 text-red-500">
          Error loading dashboard data
        </div>
      </div>
    );
  }

  // Calculate stats based on API data
  const stats = [
    {
      title: "Total Properties",
      value: dashboardStats?.totalProperties || 0,
      icon: Building2,
      trend: "+12%",
    },
    {
      title: "Scheduled Viewings",
      value: dashboardStats?.totalScheduleViewings || 0,
      icon: Calendar,
      trend: "+8%",
    },
    {
      title: "Info Requests",
      value: dashboardStats?.totalInfoRequests || 0,
      icon: MessageSquare,
      trend: "+15%",
    },
    {
      title: "Total Impressions",
      value: dashboardStats?.totalImpressions || 0,
      icon: Eye,
      trend: "+25%",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold text-[#235C47] mb-2">
          Dashboard
        </h1>
        <p className="text-[#235C47]/70">
          Welcome to Haven Estates Admin Panel
        </p>
      </div>

      <StatsGrid stats={stats} />

      {/* Two-column layout for Top Properties and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border border-[#235C47]/20 bg-[#F9F7F6]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#235C47]">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity?.slice(0, 5).map((activity: any) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between border-b border-[#235C47]/20 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-[#235C47]">
                      {activity.action}
                    </p>
                    <p className="text-sm text-[#235C47]/70">
                      {activity.details}
                    </p>
                    <p className="text-xs text-[#235C47]/50 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#235C47]/70">{activity.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Properties by Views */}
        <Card className="border border-[#235C47]/20 bg-[#F9F7F6]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#235C47]">
              Top Properties by Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProperties?.slice(0, 5).map((property: any) => (
                <div
                  key={property._id}
                  className="flex items-center justify-between border-b border-[#235C47]/20 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={property.image || "/placeholder-property.jpg"}
                      alt={property.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      width={64}
                      height={64}
                    />
                    <div>
                      <p className="font-medium text-[#235C47]">
                        {property.title}
                      </p>
                      <p className="text-sm text-[#235C47]/70">
                        {property.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#235C47]">
                      {property.numberOfViews || 0}
                    </p>
                    <p className="text-xs text-[#235C47]/70">views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
