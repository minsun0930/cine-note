import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import MainPage from "../pages/MainPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import MovieFoundPage from "../pages/MovieFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/search",
        element: <MovieFoundPage/>,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);
