"use client";

import { useGetMyScheduleViewingQuery } from "@/src/redux/features/Buyer/buyers";
import { useState } from "react";

interface Viewing {
  id: string;
  property: string;
  address: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  agent: string;
  agentPhone: string;
}

const ScheduleViewingPage = () => {
  const { data, isLoading } = useGetMyScheduleViewingQuery({});
  console.log(data);
  const [viewings, setViewings] = useState<Viewing[]>([
    {
      id: "1",
      property: "Modern Downtown Apartment",
      address: "123 Main St, New York, NY 10001",
      date: "2023-06-15",
      time: "14:30",
      status: "scheduled",
      agent: "John Smith",
      agentPhone: "+1 (555) 123-4567",
    },
    {
      id: "2",
      property: "Suburban Family Home",
      address: "456 Oak Ave, Boston, MA 02108",
      date: "2023-06-20",
      time: "10:00",
      status: "scheduled",
      agent: "Sarah Johnson",
      agentPhone: "+1 (555) 987-6543",
    },
    {
      id: "3",
      property: "Luxury Waterfront Villa",
      address: "789 Beach Blvd, Miami, FL 33101",
      date: "2023-05-30",
      time: "16:00",
      status: "completed",
      agent: "Michael Brown",
      agentPhone: "+1 (555) 456-7890",
    },
  ]);
  const [selectedViewing, setSelectedViewing] = useState<Viewing | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (viewing: Viewing) => {
    setSelectedViewing(viewing);
    setShowModal(true);
  };

  const handleCancelViewing = (id: string) => {
    if (confirm("Are you sure you want to cancel this viewing?")) {
      setViewings(
        viewings.map((viewing) =>
          viewing.id === id ? { ...viewing, status: "cancelled" } : viewing
        )
      );
      alert("Viewing cancelled successfully");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
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
        {viewings.length > 0 ? (
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
                {viewings.map((viewing) => (
                  <tr key={viewing.id} className="hover:bg-[#F9F7F6]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#235C47]">
                        {viewing.property}
                      </div>
                      <div className="text-sm text-[#235C47]/70">
                        {viewing.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#235C47]">
                      {new Date(viewing.date).toLocaleDateString()} at{" "}
                      {viewing.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          viewing.status
                        )}`}
                      >
                        {viewing.status.charAt(0).toUpperCase() +
                          viewing.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(viewing)}
                          className="text-[#235C47] hover:text-[#235C47]/80 font-medium"
                        >
                          View
                        </button>
                        {viewing.status !== "cancelled" &&
                          viewing.status !== "completed" && (
                            <button
                              onClick={() => handleCancelViewing(viewing.id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                <p className="text-[#235C47]/80">{selectedViewing.property}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Address</h4>
                <p className="text-[#235C47]/80">{selectedViewing.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-[#235C47]">Date</h4>
                  <p className="text-[#235C47]/80">
                    {new Date(selectedViewing.date).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#235C47]">Time</h4>
                  <p className="text-[#235C47]/80">{selectedViewing.time}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Status</h4>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    selectedViewing.status
                  )}`}
                >
                  {selectedViewing.status.charAt(0).toUpperCase() +
                    selectedViewing.status.slice(1)}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Agent</h4>
                <p className="text-[#235C47]/80">{selectedViewing.agent}</p>
                <p className="text-[#235C47]/80">
                  {selectedViewing.agentPhone}
                </p>
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
    </div>
  );
};

export default ScheduleViewingPage;
