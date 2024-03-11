import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import md5 from "md5";
import { API_BASE_URL } from "../app/constants";

interface Credentials {
  name: string;
  email: string;
  key: string;
  secret: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body: Credentials) => ({
        url: "signup",
        method: "POST",
        body,
      }),
    }),

    getUser: builder.mutation({
      query: (body: Pick<Credentials, "key" | "secret">) => ({
        url: "/myself",
        method: "GET",
        headers: {
          Key: body.key,
          Sign: md5("GET" + "/myself" + body.secret),
        },
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useGetUserMutation } = authApi;
