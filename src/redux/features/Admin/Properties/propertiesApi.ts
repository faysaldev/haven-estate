import { baseApi } from "@/src/redux/baseApi/baseApi";

const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperties: builder.mutation({
      query: (propertiesBody) => ({
        url: "/properties",
        method: "POST",
        body: propertiesBody,
      }),

      invalidatesTags: ["properties"],
    }),
    updateProperties: builder.mutation({
      query: (propertiesBody) => ({
        url: "/properties",
        method: "POST",
        body: propertiesBody,
      }),
      invalidatesTags: ["properties"],
    }),
    getProperties: builder.query({
      query: (params) => ({
        url: "/properties",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["properties"],
    }),
  }),
});

export const { useCreatePropertiesMutation, useGetPropertiesQuery } =
  propertiesApi;
