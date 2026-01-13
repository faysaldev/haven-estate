import { baseApi } from "@/src/redux/baseApi/baseApi";

const buyersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createScheduleViewing: builder.mutation({
      query: (scheduleBody) => ({
        url: "/schedule-views",
        method: "POST",
        body: scheduleBody,
      }),
    }),
    getMyScheduleViewing: builder.query({
      query: () => ({
        url: "/schedule-views/my-schedule",
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
    createRequestViewing: builder.mutation({
      query: (RequestBody) => ({
        url: "/request-info",
        method: "POST",
        body: RequestBody,
      }),
    }),
    getMyRequestViewing: builder.query({
      query: () => ({
        url: "/request-info/my-request",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    createBookingRequest: builder.mutation({
      query: (bookingsBody) => ({
        url: "/bookings",
        method: "POST",
        body: bookingsBody,
      }),
    }),
    getMyBookingRequest: builder.query({
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

    getProfiles: builder.query({
      query: () => ({
        url: `/users/self/in`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),

    updateProfile: builder.mutation({
      query: (profileBody) => ({
        url: `/users/self/update`,
        method: "PATCH",
        body: profileBody,
      }),
    }),
    getBuyerRecentActivities: builder.query({
      query: () => ({
        url: `/buyers/recent-activity`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const {
  useCreateScheduleViewingMutation,
  useCreateRequestViewingMutation,
  useCreateBookingRequestMutation,
  useGetMyBookingRequestQuery,
  useGetMyRequestViewingQuery,
  useGetMyScheduleViewingQuery,
  useCancelScheduleViewingMutation,
  useUpdateBookingRequestMutation,
  useGetProfilesQuery,
  useUpdateProfileMutation,
  useGetBuyerRecentActivitiesQuery,
} = buyersApi;
