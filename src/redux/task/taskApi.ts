/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../api/baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/tasks",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return response;
      },
      providesTags: ["tasks"],
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: "/task",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const { useAddTaskMutation, useGetAllTasksQuery } = taskApi;
