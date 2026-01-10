"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetMyBookingRequestQuery,
  useUpdateBookingRequestMutation,
} from "@/src/redux/features/Buyer/buyers";

interface Property {
  _id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  createdAt: string;
}

interface Booking {
  _id: string;
  author: string;
  id: string;
  property: Property;
  date: string;
  status:
    | "pending"
    | "confirmed"
    | "completed"
    | "cancelled"
    | "Scheduled"
    | "Completed"
    | "Cancelled";
  amount: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const BookingsPage = () => {
  const { data, isLoading } = useGetMyBookingRequestQuery({});
  const [updateBooking] = useUpdateBookingRequestMutation();
  const router = useRouter();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
      case "Completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleMakeCompleted = async () => {
    if (selectedBooking) {
      try {
        await updateBooking({
          id: selectedBooking._id,
          status: "completed",
        }).unwrap();
        setShowModal(false);
        window.location.reload(); // Refresh the page to update the data
      } catch (error) {
        console.error("Failed to update booking status:", error);
      }
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
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-[#235C47]/70">Loading bookings...</p>
          </div>
        ) : data?.data && data.data.length > 0 ? (
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
                {data?.data.map((booking: Booking) => (
                  <tr key={booking._id} className="hover:bg-[#F9F7F6]">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#235C47]">
                      {booking.property.title}
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
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="text-[#235C47] hover:text-[#235C47]/80 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
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

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-[#0000003b] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border border-[#235C47]/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-[#235C47]">
                Booking Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#235C47] hover:text-[#235C47]/80"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Property</h4>
                <p className="text-[#235C47]/80">
                  {selectedBooking.property.title}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Location</h4>
                <p className="text-[#235C47]/80">
                  {selectedBooking.property.location}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">
                  Booking ID
                </h4>
                <p className="text-[#235C47]/80">{selectedBooking.id}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Date</h4>
                <p className="text-[#235C47]/80">
                  {new Date(selectedBooking.date).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Amount</h4>
                <p className="text-[#235C47]/80">
                  ${selectedBooking.amount.toLocaleString()}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Status</h4>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    selectedBooking.status
                  )}`}
                >
                  {selectedBooking.status.charAt(0).toUpperCase() +
                    selectedBooking.status.slice(1)}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">
                  Contact Name
                </h4>
                <p className="text-[#235C47]/80">{selectedBooking.name}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Email</h4>
                <p className="text-[#235C47]/80">{selectedBooking.email}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Phone</h4>
                <p className="text-[#235C47]/80">{selectedBooking.phone}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              {(selectedBooking.status === "confirmed" ||
                selectedBooking.status === "Scheduled") && (
                <button
                  type="button"
                  onClick={handleMakeCompleted}
                  className="px-4 py-2 bg-[#235C47] text-white rounded-md hover:bg-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#235C47]/50"
                >
                  Make Completed
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-[#235C47] text-[#235C47] rounded-md hover:bg-[#F9F7F6] focus:outline-none focus:ring-2 focus:ring-[#235C47]/50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
