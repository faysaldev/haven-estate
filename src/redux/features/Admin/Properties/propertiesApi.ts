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
  }),
});

export const { useCreatePropertiesMutation } = propertiesApi;
