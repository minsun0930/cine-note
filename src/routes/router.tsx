import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import MovieDetailPage from "../pages/movie/MovieDetailPage";
import MoreMoviesPage from "@/pages/movie/MoreMoviesPage";
import MainPage from "@/pages/movie/MainPage";
import MovieSearhPage from "../pages/movie/MovieSearchPage";
import LoginPage from "@/pages/user/LoginPage";
import SignUpPage from "@/pages/user/SignUpPage";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import MyPage from "@/pages/user/MyPage";
import ChangePassword from "@/pages/user/ChangePassword";
import AccountManagement from "@/pages/user/AccountManagement";





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
        path: "/movies/more",
        element: <MoreMoviesPage />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "/search",
        element: <MovieSearhPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/my",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my/changePassword",
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my/account",
        element: (
          <ProtectedRoute>
            <AccountManagement />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
