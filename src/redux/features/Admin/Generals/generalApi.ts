import { baseApi } from "@/src/redux/baseApi/baseApi";

const generalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAgents: builder.mutation({
      query: (agents) => ({
        url: "/admin/agents",
        method: "POST",
        body: agents,
      }),
      invalidatesTags: ["agents"],
    }),
    getAgents: builder.query({
      query: () => ({
        url: "/admin/agents",
        method: "GET",
      }),
      providesTags: ["agents"],
      transformResponse: (response) => response.data,
    }),
    updateTermsConditions: builder.mutation({
      query: (terms) => ({
        url: "/admin/terms-conditions",
        method: "PUT",
        body: terms,
      }),
      invalidatesTags: ["termsConditions"],
    }),
    getTermsConditions: builder.query({
      query: () => ({
        url: "/admin/terms-conditions",
        method: "GET",
      }),
      providesTags: ["termsConditions"],
      transformResponse: (response) => response.data,
    }),

    updatePrivacyPolicy: builder.mutation({
      query: (privacy) => ({
        url: "/admin/privacy-policy",
        method: "PUT",
        body: privacy,
      }),
      invalidatesTags: ["privacyPolicy"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/admin/privacy-policy",
        method: "GET",
      }),
      providesTags: ["privacyPolicy"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useCreateAgentsMutation,
  useGetAgentsQuery,
  useUpdateTermsConditionsMutation,
  useGetTermsConditionsQuery,
  useUpdatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
} = generalApi;
