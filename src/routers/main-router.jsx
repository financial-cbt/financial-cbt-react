import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../routes/page";
import ExamplePage from "../routes/example/page";
import Layout from "../routes/layout";
import Signup from "../components/Signup";
import Login from "../components/Login";
import ArticleList from "../routes/article/page";
import ArticleDetail from "../routes/article/detail/page";
import RandomQuiz from "../routes/Quiz/RandomQuiz";
import Quiz from "../routes/Quiz/Quiz";
import MyPage from "../routes/user/MyPage";
import Board from "../routes/board/page";
import BoardDetail from "../routes/board/detail/page";
import BoardWrite from "../routes/board/wrtie/page";
import PrivateRoute from "~/components/PrivateRoute";

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
      // {
      //   path: "signup",
      //   index: true,
      //   element: <SignUpPage />,
      // },
      // {
      //   path: "signin",
      //   index: true,
      //   element: <SignInPage />,
      // },
    ],
  },
];

const router = createBrowserRouter(mainRouter);

export default router;
