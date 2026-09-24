import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import MovieDetailPage from "../pages/MovieDetailPage";
import MoreMoviesPage from "@/pages/MoreMoviesPage";
import MainPage from "@/pages/MainPage";
import MovieSearhPage from "../pages/MovieSearchPage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/components/common/user/SignUp";


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
        path : "/movies/more",
        element: <MoreMoviesPage />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "/search",
        element: <MovieSearhPage/>,
      },
      {
        path : "/login",
        element : <LoginPage />,
      },
      {
        path: "/signup",
        element : <SignUpPage/>,
      },
    
    ],
  },
]);
