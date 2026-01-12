import { baseApi } from "@/src/redux/baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/admin/dashboard-stats",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    getRecentActivities: builder.query({
      query: () => ({
        url: "/admin/recent-activity",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    getTopPropertiesView: builder.query({
      query: () => ({
        url: "/admin/top-properties-views",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentActivitiesQuery,
  useGetTopPropertiesViewQuery,
} = dashboardApi;
