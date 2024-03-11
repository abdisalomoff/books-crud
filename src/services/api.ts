import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import md5 from "md5";

type QueryArgs = {
  url: string;
  method: string;
  body?: Record<string, unknown>;
};

export const queryWithHeaders = (args: QueryArgs): string | FetchArgs => {
  const auth = sessionStorage.getItem("auth");

  if (!auth) {
    throw new Error("Not authenticated");
  }

  const { key, secret } = JSON.parse(auth);

  const { url, method = "GET", body = "" } = args;

  return {
    ...args,
    headers: {
      Key: key,
      Sign: md5(method + url + (body && JSON.stringify(body)) + secret),
    },
  };
};
