"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Building2,
  Calendar,
  MessageSquare,
  CreditCard,
  TrendingUp,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Downtown, NY",
    image: "/placeholder-property.jpg",
    impressions: 1240,
  },
  {
    id: 2,
    title: "Luxury Beach Villa",
    location: "Miami, FL",
    image: "/placeholder-property.jpg",
    impressions: 980,
  },
  {
    id: 3,
    title: "Suburban Family Home",
    location: "Austin, TX",
    image: "/placeholder-property.jpg",
    impressions: 765,
  },
  {
    id: 4,
    title: "Mountain View Cabin",
    location: "Denver, CO",
    image: "/placeholder-property.jpg",
    impressions: 542,
  },
  {
    id: 5,
    title: "City Center Loft",
    location: "Chicago, IL",
    image: "/placeholder-property.jpg",
    impressions: 421,
  },
];

const mockScheduledViewings = [
  {
    id: 1,
    userName: "John Smith",
    propertyTitle: "Modern Downtown Apartment",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    propertyTitle: "Luxury Beach Villa",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 3,
    userName: "Michael Brown",
    propertyTitle: "Suburban Family Home",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

const mockInfoRequests = [
  {
    id: 1,
    userName: "Emily Davis",
    propertyTitle: "Mountain View Cabin",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 2,
    userName: "Robert Wilson",
    propertyTitle: "City Center Loft",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const mockBookings = [
  {
    id: 1,
    propertyTitle: "Modern Downtown Apartment",
    amount: 1200000,
    status: "confirmed",
  },
  {
    id: 2,
    propertyTitle: "Luxury Beach Villa",
    amount: 2500000,
    status: "confirmed",
  },
  {
    id: 3,
    propertyTitle: "Suburban Family Home",
    amount: 850000,
    status: "pending",
  },
  {
    id: 4,
    propertyTitle: "Mountain View Cabin",
    amount: 450000,
    status: "confirmed",
  },
];

const Dashboard = () => {
  const properties = mockProperties;
  const scheduledViewings = mockScheduledViewings;
  const infoRequests = mockInfoRequests;
  const bookings = mockBookings;

  const totalImpressions = properties.reduce(
    (sum, p) => sum + (p.impressions || 0),
    0
  );
  const totalRevenue = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.amount, 0);

  const stats = [
    {
      title: "Total Properties",
      value: properties.length,
      icon: Building2,
      trend: "+12%",
      color: "text-blue-500",
    },
    {
      title: "Scheduled Viewings",
      value: scheduledViewings.length,
      icon: Calendar,
      trend: "+8%",
      color: "text-green-500",
    },
    {
      title: "Info Requests",
      value: infoRequests.length,
      icon: MessageSquare,
      trend: "+15%",
      color: "text-purple-500",
    },
    {
      title: "Bookings",
      value: bookings.length,
      icon: CreditCard,
      trend: "+20%",
      color: "text-amber-500",
    },
    {
      title: "Total Impressions",
      value: totalImpressions,
      icon: Eye,
      trend: "+25%",
      color: "text-pink-500",
    },
    {
      title: "Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      trend: "+18%",
      color: "text-emerald-500",
    },
  ];

  const recentActivity = [
    ...scheduledViewings.slice(0, 3).map((v) => ({
      type: "Viewing",
      title: `${v.userName} scheduled viewing for ${v.propertyTitle}`,
      time: new Date(v.createdAt).toLocaleDateString(),
    })),
    ...infoRequests.slice(0, 2).map((r) => ({
      type: "Request",
      title: `${r.userName} requested info for ${r.propertyTitle}`,
      time: new Date(r.createdAt).toLocaleDateString(),
    })),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to Haven Estates Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="card-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={cn("w-5 h-5", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">
                    {stat.trend}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      activity.type === "Viewing"
                        ? "bg-green-500/10"
                        : "bg-purple-500/10"
                    )}
                  >
                    {activity.type === "Viewing" ? (
                      <Calendar className="w-5 h-5 text-green-500" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No recent activity
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Top Properties by Impressions */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">
            Top Properties by Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {properties
              .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
              .slice(0, 5)
              .map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {property.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {property.impressions || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
