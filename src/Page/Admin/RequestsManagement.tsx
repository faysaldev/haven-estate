"use client";

import { useState } from "react";
import { RequestList } from "@/src/components/requests/RequestList";
import { Request } from "@/src/components/requests/types";

const RequestsManagement = () => {
  // Mock info requests data
  const [infoRequests, setInfoRequests] = useState<Request[]>([
    {
      id: "1",
      propertyTitle: "Modern Downtown Apartment",
      userName: "John Smith",
      userEmail: "john.smith@email.com",
      userPhone: "+1 (555) 123-4567",
      message:
        "I'm interested in learning more about this property. Is it still available for viewing this week?",
      status: "pending",
      createdAt: "2024-11-25T10:30:00Z",
    },
    {
      id: "2",
      propertyTitle: "Luxury Waterfront Condo",
      userName: "Sarah Johnson",
      userEmail: "sarah.johnson@email.com",
      userPhone: "+1 (555) 987-6543",
      message:
        "Could you please send me more details about the amenities included in this property?",
      status: "responded",
      createdAt: "2024-11-24T14:22:00Z",
    },
    {
      id: "3",
      propertyTitle: "Suburban Family Home",
      userName: "Michael Brown",
      userEmail: "michael.brown@email.com",
      userPhone: "+1 (555) 456-7890",
      message:
        "What's the process for scheduling a home inspection? I'm very interested in this property.",
      status: "pending",
      createdAt: "2024-11-23T09:15:00Z",
    },
    {
      id: "4",
      propertyTitle: "City Center Loft",
      userName: "Emily Davis",
      userEmail: "emily.davis@email.com",
      userPhone: "+1 (555) 234-5678",
      message:
        "I saw this listing online and would like to know if the price is negotiable.",
      status: "responded",
      createdAt: "2024-11-22T16:45:00Z",
    },
  ]);

  const handleStatusChange = (id: string, status: "pending" | "responded") => {
    setInfoRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      setInfoRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#235C47]">
            Info Requests Management
          </h1>
          <p className="text-[#235C47]/70 mt-1">
            Manage property information requests
          </p>
        </div>

        <RequestList
          requests={infoRequests}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default RequestsManagement;
