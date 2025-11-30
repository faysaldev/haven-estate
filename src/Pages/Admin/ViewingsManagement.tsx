"use client";

import AdminLayout from "@/src/layout/AdminLayout";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, Mail, Phone, Trash2 } from "lucide-react";

const ViewingsManagement = () => {
  // Mock scheduled viewings data
  const [scheduledViewings, setScheduledViewings] = useState([
    {
      id: "1",
      propertyTitle: "Modern Downtown Apartment",
      userName: "John Smith",
      userEmail: "john.smith@email.com",
      userPhone: "+1 (555) 123-4567",
      date: "2024-12-10",
      time: "10:00 AM",
      status: "pending",
      createdAt: "2024-11-25T09:30:00Z",
    },
    {
      id: "2",
      propertyTitle: "Luxury Waterfront Condo",
      userName: "Sarah Johnson",
      userEmail: "sarah.johnson@email.com",
      userPhone: "+1 (555) 987-6543",
      date: "2024-12-12",
      time: "02:00 PM",
      status: "confirmed",
      createdAt: "2024-11-24T14:22:00Z",
    },
    {
      id: "3",
      propertyTitle: "Suburban Family Home",
      userName: "Michael Brown",
      userEmail: "michael.brown@email.com",
      userPhone: "+1 (555) 456-7890",
      date: "2024-12-15",
      time: "11:00 AM",
      status: "pending",
      createdAt: "2024-11-23T10:15:00Z",
    },
    {
      id: "4",
      propertyTitle: "City Center Loft",
      userName: "Emily Davis",
      userEmail: "emily.davis@email.com",
      userPhone: "+1 (555) 234-5678",
      date: "2024-12-08",
      time: "03:30 PM",
      status: "cancelled",
      createdAt: "2024-11-22T16:45:00Z",
    },
  ]);

  const handleStatusChange = (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => {
    setScheduledViewings((prevViewings) =>
      prevViewings.map((viewing) =>
        viewing.id === id ? { ...viewing, status } : viewing
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this viewing?")) {
      setScheduledViewings((prevViewings) =>
        prevViewings.filter((viewing) => viewing.id !== id)
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-serif font-bold">Scheduled Viewings</h1>
          <p className="text-muted-foreground mt-1">
            Manage property viewing appointments
          </p>
        </div>

        <div className="grid gap-6">
          {scheduledViewings.length === 0 ? (
            <Card className="card-shadow">
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No scheduled viewings yet
                </p>
              </CardContent>
            </Card>
          ) : (
            scheduledViewings.map((viewing) => (
              <Card key={viewing.id} className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-1">
                        {viewing.propertyTitle}
                      </h3>
                      <Badge
                        className={getStatusColor(viewing.status)}
                        variant="outline"
                      >
                        {viewing.status}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(viewing.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <p className="font-medium">Client Information</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">
                          {viewing.userName}
                        </p>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${viewing.userEmail}`}
                            className="hover:text-primary"
                          >
                            {viewing.userEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <a
                            href={`tel:${viewing.userPhone}`}
                            className="hover:text-primary"
                          >
                            {viewing.userPhone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Viewing Details</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {viewing.date} at {viewing.time}
                          </span>
                        </div>
                        <p>
                          Requested:{" "}
                          {new Date(viewing.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {viewing.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusChange(viewing.id, "confirmed")
                        }
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(viewing.id, "cancelled")
                        }
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewingsManagement;
