// ** React Imports
import { lazy } from "react";

const Home = lazy(() => import("../../views/Home"));
const SecondPage = lazy(() => import("../../views/SecondPage"));
const Login = lazy(() => import("../../views/Login"));

const AuthenticationRoutes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  //   index: true,
  //   meta: {
  //     publicRoute: true,
  //     restricted: true,

  //     layout: "blank",
  //   },
    //  }
  // {
  //   path: "/error",
  //   element: <Error />,
  //   meta: {
  //     layout: "blank",
  //   },
  // },


];

export default AuthenticationRoutes;
