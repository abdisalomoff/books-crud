import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import HomePage from "../pages/HomePage";
import LogoutPage from "../pages/LogoutPage";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(MainLayout),
    children: [
      { index: true, element: createElement(HomePage) },
      { path: "search", element: createElement(SearchPage) },
      { path: "logout", element: createElement(LogoutPage) },
    ],
  },
]);

export default router;
