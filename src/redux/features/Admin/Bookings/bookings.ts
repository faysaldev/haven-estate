import { baseApi } from "@/src/redux/baseApi/baseApi";

const buyersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateScheduleViewing: builder.mutation({
      query: ({ id, status }) => ({
        url: `/schedule-views/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["scheduleView"],
    }),
    getAllScheduleViewing: builder.query({
      query: () => ({
        url: "/schedule-views",
        method: "GET",
      }),
      providesTags: ["scheduleView"],
      transformResponse: (res) => res.data,
    }),
    cancelScheduleViewing: builder.mutation({
      query: (id) => ({
        url: `/schedule-views/${id}`,
        method: "PATCH",
        body: { status: "Cancelled" },
      }),
      invalidatesTags: ["scheduleView"],
    }),
    updateRequestViewing: builder.mutation({
      query: ({ id, body }) => ({
        url: `/request-info/${id}/status`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["requestInfo"],
    }),
    getAllRequestViewing: builder.query({
      query: () => ({
        url: "/request-info",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["requestInfo"],
    }),
    getAllBookingRequest: builder.query({
      query: (params) => ({
        url: "/bookings/my-bookings",
        method: "GET",
        params, // Pass pagination parameters
      }),
      transformResponse: (res) => res?.data, // Return full response to access pagination data
      providesTags: ["bookingView"],
    }),
    updateBookingRequest: builder.mutation({
      query: ({ id, status }) => ({
        url: `/bookings/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["bookingView"],
    }),
  }),
});

export const {
  useUpdateScheduleViewingMutation,
  useGetAllScheduleViewingQuery,
  useCancelScheduleViewingMutation,
  useUpdateRequestViewingMutation,
  useGetAllRequestViewingQuery,
  useGetAllBookingRequestQuery,
  useUpdateBookingRequestMutation,
} = buyersApi;
