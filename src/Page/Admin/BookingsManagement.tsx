/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { BookingList } from "@/src/components/booking-management/BookingList";
import {
  useGetAllBookingRequestQuery,
  useUpdateBookingRequestMutation,
} from "@/src/redux/features/Admin/Bookings/bookings";

const BookingsManagement = () => {
  const [page, setPage] = useState(1);

  const {
    data: bookingViewing,
    isLoading,
    isError,
  } = useGetAllBookingRequestQuery({ currentPage: page, itemsPerPage: 10 });
  console.log(bookingViewing);
  const [updateBookingView] = useUpdateBookingRequestMutation();

  const mapStatus = (
    apiStatus: string
  ): "pending" | "confirmed" | "completed" | "cancelled" => {
    switch (apiStatus.toLowerCase()) {
      case "completed":
        return "completed";
      case "cancelled":
        return "cancelled";
      case "confirmed":
        return "confirmed";
      default:
        return "pending";
    }
  };

  // Map API data to Booking interface
  const bookings =
    bookingViewing?.data?.map((booking: any) => ({
      id: booking._id,
      propertyTitle: booking.property?.title || "N/A",
      userName: booking.name,
      userEmail: booking.email,
      userPhone: booking.phone,
      moveInDate: booking.date
        ? new Date(booking.date).toISOString().split("T")[0]
        : "",
      amount: booking.amount,
      status: mapStatus(booking.status),
      createdAt: booking.createdAt,
    })) || [];

  const pagination = bookingViewing?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: bookings.length,
    itemsPerPage: 10,
  };

  const handleStatusChange = async (
    id: string,
    status: "pending" | "confirmed" | "completed" | "cancelled"
  ) => {
    try {
      await updateBookingView({ id, status }).unwrap();
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      // Delete functionality would go here
      console.log("Delete functionality would go here");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-2xl text-[#235C47]">Loading bookings...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-2xl text-red-500">Error loading bookings</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">
            Bookings Management
          </h1>
          <p className="text-[#235C47]/80 mt-2">
            Manage property bookings and reservations
          </p>
        </div>

        <BookingList
          bookings={bookings}
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
            {pagination.totalItems} total bookings)
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

export default BookingsManagement;
