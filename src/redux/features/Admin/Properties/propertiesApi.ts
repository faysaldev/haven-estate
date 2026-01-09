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
    deleteProperties: builder.mutation({
      query: (propertiesId) => ({
        url: `/properties/${propertiesId}`,
        method: "DELETE",
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
    getAdminProperties: builder.query({
      query: (params) => ({
        url: "/properties/admin",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["properties"],
    }),
    getSingleProperties: builder.query({
      query: (propertyId) => ({
        url: `/properties/${propertyId}`,
        method: "GET",
      }),
      providesTags: ["properties"],
    }),
  }),
});

export const {
  useCreatePropertiesMutation,
  useGetPropertiesQuery,
  useUpdatePropertiesMutation,
  useDeletePropertiesMutation,
  useGetAdminPropertiesQuery,
} = propertiesApi;
