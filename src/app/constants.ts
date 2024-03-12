import { BookStatuses } from "../types";

export const API_BASE_URL = "https://no23.lavina.tech";

export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
};

export const BOOK_STATUS: BookStatuses = {
  0: { label: "New", color: "info" },
  1: { label: "Reading", color: "warning" },
  2: { label: "Finished", color: "success" },
};
