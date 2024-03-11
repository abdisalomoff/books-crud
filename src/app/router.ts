import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../components/BaseLayout";
import HomePage from "../pages/HomePage";
import LogoutPage from "../pages/LogoutPage";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(BaseLayout),
    children: [
      { index: true, element: createElement(HomePage) },
      { path: "search", element: createElement(SearchPage) },
      { path: "logout", element: createElement(LogoutPage) },
    ],
  },
]);

export default router;
