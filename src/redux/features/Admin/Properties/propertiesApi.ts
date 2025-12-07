import { baseApi } from "@/src/redux/baseApi/baseApi";

const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperties: builder.mutation({
      query: (propertiesBody) => ({
        url: "/properties",
        method: "POST",
        body: propertiesBody,
      }),
    }),
    updateProperties: builder.mutation({
      query: (propertiesBody) => ({
        url: "/properties",
        method: "POST",
        body: propertiesBody,
      }),
    }),
    getProperties: builder.query({
      query: () => ({
        url: "/properties",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePropertiesMutation, useGetPropertiesQuery } =
  propertiesApi;
