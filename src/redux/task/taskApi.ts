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

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),

    updateTask: builder.mutation({
      query: (data) => {
        return {
          url: `/task/${data.id}`,
          method: "PATCH",
          body: data.body,
        };
      },
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetAllTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
