import { RouteObject } from "react-router-dom";
import { PATHS } from "./paths";
import { Layout } from "./components/Layout";
import Home from "../pages/Home";
import ManageBusinesses from "../pages/business/ManageBusinesses";
import BusinessForm from "../pages/business/BusinessForm";
import Suggestions from "../pages/suggestion/Suggestions";
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
      {
        path: `${PATHS.BUSINESSES}/create`,
        element: <BusinessForm />,
      },
      {
        path: `${PATHS.BUSINESSES}/:id`,
        element: <BusinessForm />,
      },
      {
        path: PATHS.SUGGESTIONS,
        element: <Suggestions />,
      },
    ],
  },
];
