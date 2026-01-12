import { baseApi } from "@/src/redux/baseApi/baseApi";

const buyersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateScheduleViewing: builder.mutation({
      query: (scheduleBody) => ({
        url: "/schedule-views",
        method: "POST",
        body: scheduleBody,
      }),
    }),
    getAllScheduleViewing: builder.query({
      query: () => ({
        url: "/schedule-views",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    cancelScheduleViewing: builder.mutation({
      query: (id) => ({
        url: `/schedule-views/${id}`,
        method: "PATCH",
        body: { status: "Cancelled" },
      }),
    }),
    updateRequestViewing: builder.mutation({
      query: (RequestBody) => ({
        url: "/request-info",
        method: "POST",
        body: RequestBody,
      }),
    }),
    getAllRequestViewing: builder.query({
      query: () => ({
        url: "/request-info",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    getAllBookingRequest: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    updateBookingRequest: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body: { status: "Completed" },
      }),
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
