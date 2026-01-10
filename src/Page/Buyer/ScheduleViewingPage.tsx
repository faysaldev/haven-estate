"use client";

import {
  useGetMyScheduleViewingQuery,
  useCancelScheduleViewingMutation,
} from "@/src/redux/features/Buyer/buyers";
import { useState } from "react";

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

interface ScheduleViewing {
  _id: string;
  author: string;
  name: string;
  email: string;
  phone: string;
  view_date: string;
  view_time: string;
  property_id: Property | null;
  status: "Scheduled" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ScheduleViewingPage = () => {
  const { data, isLoading, refetch } = useGetMyScheduleViewingQuery({});
  const [cancelScheduleViewing] = useCancelScheduleViewingMutation();
  const [selectedViewing, setSelectedViewing] =
    useState<ScheduleViewing | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [viewingToCancel, setViewingToCancel] = useState<string | null>(null);

  const handleViewDetails = (viewing: ScheduleViewing) => {
    setSelectedViewing(viewing);
    setShowModal(true);
  };

  const handleCancelClick = (id: string) => {
    setViewingToCancel(id);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    if (viewingToCancel) {
      try {
        await cancelScheduleViewing(viewingToCancel).unwrap();
        console.log(`Viewing with ID ${viewingToCancel} cancelled`);
        refetch(); // Refresh the data after cancellation
        setShowCancelModal(false);
        setViewingToCancel(null);
      } catch (error) {
        console.error("Failed to cancel viewing:", error);
      }
    }
  };

  const handleCancelModalClose = () => {
    setShowCancelModal(false);
    setViewingToCancel(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">
          Schedule Property Viewing
        </h1>
        <p className="text-[#235C47]/80 mt-2">
          Book a time to view a property in person
        </p>
      </div>

      {/* Viewings List */}
      <div className="bg-white p-6 rounded-xl border border-[#235C47]/20">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-[#235C47]/70">Loading scheduled viewings...</p>
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
                    Date & Time
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
                {data?.data.map((viewing: ScheduleViewing) => (
                  <tr key={viewing._id} className="hover:bg-[#F9F7F6]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#235C47]">
                        {viewing.property_id
                          ? viewing.property_id.title
                          : "N/A"}
                      </div>
                      <div className="text-sm text-[#235C47]/70">
                        {viewing.property_id
                          ? viewing.property_id.location
                          : "Location not specified"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#235C47]">
                      {new Date(viewing.view_date).toLocaleDateString()} at{" "}
                      {viewing.view_time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          viewing.status
                        )}`}
                      >
                        {viewing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(viewing)}
                          className="text-[#235C47] cursor-pointer underline hover:text-[#235C47]/80 font-medium"
                        >
                          View
                        </button>
                        {viewing.status !== "Cancelled" &&
                          viewing.status !== "Completed" && (
                            <button
                              onClick={() => handleCancelClick(viewing._id)}
                              className="text-red-600 cursor-pointer underline hover:text-red-800 font-medium"
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
        ) : (
          <div className="text-center py-8">
            <p className="text-[#235C47]/70">
              You have no scheduled viewings yet.
            </p>
          </div>
        )}
      </div>

      {/* Viewing Details Modal */}
      {showModal && selectedViewing && (
        <div className="fixed inset-0 bg-[#0000003b] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border border-[#235C47]/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-[#235C47]">
                Viewing Details
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
                  {selectedViewing.property_id
                    ? selectedViewing.property_id.title
                    : "N/A"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Address</h4>
                <p className="text-[#235C47]/80">
                  {selectedViewing.property_id
                    ? selectedViewing.property_id.location
                    : "Location not specified"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-[#235C47]">Date</h4>
                  <p className="text-[#235C47]/80">
                    {new Date(selectedViewing.view_date).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#235C47]">Time</h4>
                  <p className="text-[#235C47]/80">
                    {selectedViewing.view_time}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Status</h4>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    selectedViewing.status
                  )}`}
                >
                  {selectedViewing.status}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">
                  Contact Name
                </h4>
                <p className="text-[#235C47]/80">{selectedViewing.name}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Email</h4>
                <p className="text-[#235C47]/80">{selectedViewing.email}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Phone</h4>
                <p className="text-[#235C47]/80">{selectedViewing.phone}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
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

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border border-[#235C47]/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-[#235C47]">
                Confirm Cancellation
              </h3>
              <button
                onClick={handleCancelModalClose}
                className="text-[#235C47] hover:text-[#235C47]/80"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-[#235C47]/80">
                Are you sure you want to cancel this viewing? This action cannot
                be undone.
              </p>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleCancelModalClose}
                className="px-4 py-2 border border-[#235C47] text-[#235C47] rounded-md hover:bg-[#F9F7F6] focus:outline-none focus:ring-2 focus:ring-[#235C47]/50"
              >
                No, Keep It
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-[#235C47] text-white rounded-md hover:bg-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#235C47]/50"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleViewingPage;
