import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../routes/MainPage";
import ExamplePage from "../routes/example/page";
import Layout from "../routes/layout";
import Signup from "../components/Signup";
import Login from "../components/Login";
import ArticleList from "../routes/article/ArticleList";
import RandomQuiz from "../routes/Quiz/RandomQuiz";
import Quiz from "../routes/Quiz/Quiz";

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
      {
        path: "articlelist",
        index: true,
        element: <ArticleList />,
      },
      {
        path: "quiz",
        index: true,
        element: <RandomQuiz />,
      },
      {
        path: "quizground",
        index: true,
        element: <Quiz />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);

export default router;
