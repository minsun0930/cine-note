import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import { useFavoriteStore } from "./store/useFavoriteStore";
import { useEffect } from "react";
import { supabase } from "./supabase/supabaseClient";



function App() {
const { setFavorites } = useFavoriteStore();

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return; // 로그인 안 되어 있으면 중단

      const { data, error } = await supabase
        .from("favorites")
        .select("movie_id")
        .eq("user_id", userData.user.id);

      if (!error && data) {
        setFavorites(data.map((item) => item.movie_id));
      }
    };

    fetchFavorites();
  }, [setFavorites]);
  return (
    <RouterProvider router={router}/>
  )
}

export default App
