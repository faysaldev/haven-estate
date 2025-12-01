"use client";
import { useState } from "react";
import { BookingList } from "@/src/components/booking-management/BookingList";
import { Booking } from "@/src/components/booking-management/types";

const BookingsManagement = () => {
  // Mock booking data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      propertyTitle: "Modern Downtown Apartment",
      userName: "John Smith",
      userEmail: "john.smith@email.com",
      userPhone: "+1 (555) 123-4567",
      moveInDate: "2024-12-15",
      amount: 2450,
      status: "pending",
      createdAt: "2024-11-20T10:30:00Z",
    },
    {
      id: "2",
      propertyTitle: "Luxury Waterfront Condo",
      userName: "Sarah Johnson",
      userEmail: "sarah.johnson@email.com",
      userPhone: "+1 (555) 987-6543",
      moveInDate: "2024-12-20",
      amount: 3200,
      status: "confirmed",
      createdAt: "2024-11-18T14:22:00Z",
    },
    {
      id: "3",
      propertyTitle: "Suburban Family Home",
      userName: "Michael Brown",
      userEmail: "michael.brown@email.com",
      userPhone: "+1 (555) 456-7890",
      moveInDate: "2024-12-25",
      amount: 1850,
      status: "cancelled",
      createdAt: "2024-11-22T09:15:00Z",
    },
    {
      id: "4",
      propertyTitle: "City Center Loft",
      userName: "Emily Davis",
      userEmail: "emily.davis@email.com",
      userPhone: "+1 (555) 234-5678",
      moveInDate: "2025-01-10",
      amount: 2800,
      status: "pending",
      createdAt: "2024-11-25T16:45:00Z",
    },
  ]);

  const handleStatusChange = (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== id)
      );
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">Bookings Management</h1>
          <p className="text-[#235C47]/80 mt-2">
            Manage property bookings and reservations
          </p>
        </div>

        <BookingList
          bookings={bookings}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default BookingsManagement;
