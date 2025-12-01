"use client";

import { useState } from "react";
import { ViewingList } from "@/src/components/viewings/ViewingList";
import { PropertyViewing } from "@/src/components/viewings/types";

const ViewingsManagement = () => {
  // Mock scheduled viewings data
  const [scheduledViewings, setScheduledViewings] = useState<PropertyViewing[]>([
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

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#235C47]">
            Scheduled Viewings Management
          </h1>
          <p className="text-[#235C47]/70 mt-1">
            Manage property viewing appointments
          </p>
        </div>

        <ViewingList
          viewings={scheduledViewings}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ViewingsManagement;
