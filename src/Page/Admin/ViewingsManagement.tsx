/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ViewingList } from "@/src/components/viewings/ViewingList";
import {
  useGetAllScheduleViewingQuery,
  useUpdateScheduleViewingMutation,
} from "@/src/redux/features/Admin/Bookings/bookings";

const ViewingsManagement = () => {
  const {
    data: scheduledView,
    isLoading,
    isError,
  } = useGetAllScheduleViewingQuery({});
  const [updateScheduleView] = useUpdateScheduleViewingMutation();

  // Map API data to PropertyViewing interface
  const scheduledViewings =
    scheduledView?.data?.map((view: any) => ({
      id: view._id,
      propertyTitle: view.property_id?.title || "N/A",
      userName: view.name,
      userEmail: view.email,
      userPhone: view.phone,
      date: view.view_date
        ? new Date(view.view_date).toISOString().split("T")[0]
        : "",
      time: view.view_time,
      status: view.status,
      createdAt: view.createdAt,
    })) || [];

  const handleStatusChange = async (
    id: string,
    status: "Scheduled" | "Completed" | "Cancelled"
  ) => {
    try {
      const apiStatus = status.charAt(0).toUpperCase() + status.slice(1);
      await updateScheduleView({ id, status: apiStatus }).unwrap();
    } catch (error) {
      console.error("Failed to update viewing status:", error);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this viewing?")) {
      // Assuming there's a delete function, though not mentioned in requirements
      console.log("Delete functionality would go here");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-2xl text-[#235C47]">
          Loading scheduled viewings...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-2xl text-red-500">
          Error loading scheduled viewings
        </div>
      </div>
    );
  }

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
