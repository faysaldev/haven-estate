/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { RequestList } from "@/src/components/requests/RequestList";
import {
  useGetAllRequestViewingQuery,
  useUpdateRequestViewingMutation,
} from "@/src/redux/features/Admin/Bookings/bookings";

const RequestsManagement = () => {
  const [page, setPage] = useState(1);
  const {
    data: requestViewing,
    isLoading,
    isError,
  } = useGetAllRequestViewingQuery({ currentPage: page, itemsPerPage: 10 });
  const [updateRequestView] = useUpdateRequestViewingMutation();
  console.log(requestViewing);

  const mapStatus = (apiStatus: string): "pending" | "responded" => {
    switch (apiStatus.toLowerCase()) {
      case "read":
        return "responded";
      case "archived":
        return "responded";
      default:
        return "pending";
    }
  };

  // Map API data to InfoRequest interface
  const infoRequests =
    requestViewing?.data?.map((request: any) => ({
      id: request._id,
      propertyTitle: request.property_id?.title || "N/A",
      userName: request.name,
      userEmail: request.email,
      userPhone: request.phone,
      message: request.message,
      status: mapStatus(request.status),
      createdAt: request.createdAt,
    })) || [];

  const pagination = requestViewing?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: infoRequests.length,
    itemsPerPage: 10,
  };

  const handleStatusChange = async (
    id: string,
    status: "pending" | "responded"
  ) => {
    try {
      // Convert status to match API format (lowercase for unread/read/archived)
      let apiStatus = "unread";
      if (status === "responded") {
        apiStatus = "read"; // or "archived" depending on business logic
      }

      await updateRequestView({ id, body: { status: apiStatus } }).unwrap();
      // The data will automatically update through RTK Query cache invalidation
    } catch (error) {
      console.error("Failed to update request status:", error);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      // Delete functionality would go here
      console.log("Delete functionality would go here");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-2xl text-[#235C47]">Loading requests...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-2xl text-red-500">Error loading requests</div>
      </div>
    );
  }

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

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page <= 1}
            className={`px-4 py-2 rounded-md ${
              page <= 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#235C47] text-white hover:bg-opacity-90"
            }`}
          >
            Previous
          </button>

          <span className="text-[#235C47]">
            Page {pagination.currentPage} of {pagination.totalPages}(
            {pagination.totalItems} total requests)
          </span>

          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, pagination.totalPages || 1))
            }
            disabled={page >= (pagination.totalPages || 1)}
            className={`px-4 py-2 rounded-md ${
              page >= (pagination.totalPages || 1)
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#235C47] text-white hover:bg-opacity-90"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestsManagement;
