"use client";

import { useGetMyRequestViewingQuery } from "@/src/redux/features/Buyer/buyers";
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

interface RequestInfo {
  _id: string;
  author: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id: Property | null;
  status: "unread" | "read" | "responded";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const RequestInfoPage = () => {
  const { data, isLoading } = useGetMyRequestViewingQuery({});
  const [selectedRequest, setSelectedRequest] = useState<RequestInfo | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (request: RequestInfo) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-yellow-100 text-yellow-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "responded":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">
          Request Property Information
        </h1>
        <p className="text-[#235C47]/80 mt-2">
          Get more details about a property
        </p>
      </div>

      {/* Requests List */}
      <div className="bg-white p-6 rounded-xl border border-[#235C47]/20">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-[#235C47]/70">Loading requests...</p>
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#235C47] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#235C47]/20">
                {data?.data.map((request: RequestInfo) => (
                  <tr key={request._id} className="hover:bg-[#F9F7F6]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#235C47]">
                        {request.property_id
                          ? request.property_id.title
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#235C47]">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetails(request)}
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
          <div className="text-center py-8">
            <p className="text-[#235C47]/70">
              You have no information requests yet.
            </p>
          </div>
        )}
      </div>

      {/* Request Details Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-[#0000003b] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border border-[#235C47]/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-[#235C47]">
                Request Details
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
                  {selectedRequest.property_id
                    ? selectedRequest.property_id.title
                    : "N/A"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Date</h4>
                <p className="text-[#235C47]/80">
                  {new Date(selectedRequest.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">Status</h4>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    selectedRequest.status
                  )}`}
                >
                  {selectedRequest.status.charAt(0).toUpperCase() +
                    selectedRequest.status.slice(1)}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">
                  Your Name
                </h4>
                <p className="text-[#235C47]/80">{selectedRequest.name}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">
                  Your Email
                </h4>
                <p className="text-[#235C47]/80">{selectedRequest.email}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">
                  Your Phone
                </h4>
                <p className="text-[#235C47]/80">{selectedRequest.phone}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#235C47]">
                  Your Message
                </h4>
                <p className="text-[#235C47]/80">{selectedRequest.message}</p>
              </div>

              {/* Feedback Section */}
              <div className="pt-4 border-t border-[#235C47]/20">
                <h4 className="text-sm font-medium text-[#235C47] mb-2">
                  Feedback
                </h4>
                {selectedRequest.status === "responded" ? (
                  <div className="bg-[#F9F7F6] p-3 rounded-md">
                    <p className="text-[#235C47]/80">
                      {selectedRequest.message} - Response provided
                    </p>
                  </div>
                ) : (
                  <p className="text-[#235C47]/60 italic">No feedback yet</p>
                )}
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

export default RequestInfoPage;
