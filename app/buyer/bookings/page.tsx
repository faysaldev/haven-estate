"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  property: string;
  date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount: number;
}

const BookingsPage = () => {
  const router = useRouter();

  // Sample data - in a real application, this would come from an API
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      property: "Modern Downtown Apartment",
      date: "2023-06-15",
      status: "confirmed",
      amount: 450000,
    },
    {
      id: "2",
      property: "Suburban Family Home",
      date: "2023-07-22",
      status: "pending",
      amount: 650000,
    },
    {
      id: "3",
      property: "Luxury Waterfront Villa",
      date: "2023-05-30",
      status: "completed",
      amount: 1200000,
    },
    {
      id: "4",
      property: "Mountain View Cabin",
      date: "2023-08-10",
      status: "cancelled",
      amount: 320000,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (id: string) => {
    // In a real application, this would navigate to the booking details page
    console.log("View booking details for:", id);
    alert(`Viewing details for booking ${id}`);
  };

  const handleCancelBooking = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setBookings(
        bookings.map((booking) =>
          booking.id === id ? { ...booking, status: "cancelled" } : booking
        )
      );
      alert("Booking cancelled successfully");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">
          My Bookings
        </h1>
        <p className="text-[#235C47]/80 mt-2">
          View and manage your property bookings
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-[#235C47]/20">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#235C47]/20">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#235C47] uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#235C47] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#235C47] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#235C47] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#235C47] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#235C47]/20">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-[#F9F7F6]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#235C47]">
                    {booking.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#235C47]">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#235C47]">
                    ${booking.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(booking.id)}
                        className="text-[#235C47] hover:text-[#235C47]/80 font-medium"
                      >
                        View
                      </button>
                      {booking.status !== "cancelled" &&
                        booking.status !== "completed" && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Cancel
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#235C47]/70">You have no bookings yet.</p>
            <button
              onClick={() => router.push("/buyer/book-property")}
              className="mt-4 px-4 py-2 bg-[#235C47] text-white rounded-md hover:bg-[#235C47]/90 focus:outline-none focus:ring-2 focus:ring-[#235C47]/50"
            >
              Book a Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
