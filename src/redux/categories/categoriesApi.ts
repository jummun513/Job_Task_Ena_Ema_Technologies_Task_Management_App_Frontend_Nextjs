/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../api/baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response;
      },
      providesTags: ["tasks"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
