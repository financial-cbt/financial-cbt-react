import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../routes/page";
import ExamplePage from "../routes/example/page";
import Layout from "../routes/layout";
import Signup from "../components/Signup";
import Login from "../components/Login";

export const mainRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        index: true,
        element: <MainPage />,
      },
      {
        path: "example",
        index: true,
        element: <ExamplePage />,
      },
      {
        path: "signup",
        index: true,
        element: <Signup />,
      },
      {
        path: "login",
        index: true,
        element: <Login />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);

export default router;
