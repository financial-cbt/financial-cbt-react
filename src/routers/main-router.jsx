import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../routes/MainPage";
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
import BoardWrite from "../routes/board/write/page";
import PrivateRoute from "../components/PrivateRoute";

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
        path: "mypage",
        index: true,
        element: (
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        ),
      },
      {
        path: "articlelist",
        children: [
          {
            path: "",
            element: <ArticleList />,
            index: true,
          },
          {
            path: ":articleId",
            element: <ArticleDetail />,
            index: true,
          },
        ],
      },
      {
        path: "quiz",
        index: true,
        element: (
          <PrivateRoute>
            <RandomQuiz />
          </PrivateRoute>
        ),
      },
      {
        path: "quizground",
        index: true,
        element: <Quiz />,
      },
      {
        path: "board",
        children: [
          {
            path: "",
            index: true,
            element: (
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            ),
          },
          {
            path: ":boardId",
            index: true,
            element: (
              <PrivateRoute>
                <BoardDetail />
              </PrivateRoute>
            ),
          },
          {
            path: ":boardId/edit",
            element: (
              <PrivateRoute>
                <BoardWrite />
              </PrivateRoute>
            ),
            index: true,
          },
          {
            path: "write",
            index: true,
            element: (
              <PrivateRoute>
                <BoardWrite />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);

export default router;
