import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MD5 } from "crypto-js";
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
          Sign: MD5("GET" + "/myself" + body.secret),
        },
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useGetUserMutation } = authApi;
