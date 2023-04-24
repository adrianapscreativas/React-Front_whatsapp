import { lazy } from "react";

const Home = lazy(() => import("../../views/Home"));
const SecondPage = lazy(() => import("../../views/SecondPage"));
const Template = lazy(() => import("../../views/Template"))

const DashboardRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
  },
  {
    path: "/template",
    element: <Template />,
  },
];

export default DashboardRoutes;
