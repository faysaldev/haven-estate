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
    createRequestViewing: builder.mutation({
      query: (RequestBody) => ({
        url: "/request-info",
        method: "POST",
        body: RequestBody,
      }),
    }),
  }),
});

export const {
  useCreateScheduleViewingMutation,
  useCreateRequestViewingMutation,
} = buyersApi;
