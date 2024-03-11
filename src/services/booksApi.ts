import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { BookContainer } from "../types";
import { API_BASE_URL } from "../app/constants";
import { queryWithHeaders } from "./api";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    findBooks: builder.mutation({
      query: (title) =>
        queryWithHeaders({
          url: `/books/${title}`,
          method: "GET",
        }),
    }),

    getBooks: builder.query({
      query: () =>
        queryWithHeaders({
          url: "/books",
          method: "GET",
        }),
      transformResponse: (response: { data: BookContainer[] }) => {
        const transformedData =
          response.data?.map(({ book, status }: BookContainer) => ({
            ...book,
            status,
          })) || [];
        return transformedData;
      },
      providesTags: ["Books"],
    }),

    addBook: builder.mutation({
      query: (body) =>
        queryWithHeaders({ url: "/books", method: "POST", body }),
      invalidatesTags: ["Books"],
    }),

    editBookStatus: builder.mutation({
      query: ({ id, ...body }) =>
        queryWithHeaders({ url: `/books/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, arg) => {
        return ["Books", { type: "Books", id: arg.id }];
      },
    }),

    deleteBook: builder.mutation({
      query: (id) =>
        queryWithHeaders({ url: `/books/${id}`, method: "DELETE" }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useFindBooksMutation,
  useGetBooksQuery,
  useAddBookMutation,
  useEditBookStatusMutation,
  useDeleteBookMutation,
} = booksApi;
