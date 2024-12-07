import { RouteObject } from "react-router-dom";
import { PATHS } from "./paths";
import { Layout } from "./components/Layout";
import Home from "../pages/Home";
import ManageBusinesses from "../pages/business/ManageBusinesses";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: PATHS.HOME,
        element: <Home />,
      },
      {
        path: PATHS.BUSINESSES,
        element: <ManageBusinesses />,
      },
    ],
  },
];
