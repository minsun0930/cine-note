import { Heart } from "lucide-react";
import Button from "../common/Button";
import { GENRES } from "@/data/genres";
import type { Movie, MovieDetail } from "@/types/movie";
import { useNavigate, useParams } from "react-router-dom";
import MovieDetailSkeleton from "../skeleton/MovieDetailSkeleton";
import { useMovieDetail } from "@/hooks/useMovieQuery";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { supabase } from "@/supabase/supabaseClient";
import { useEffect } from "react";

export default function MovieDetail() {
  const { movieId } = useParams();
  const { data: movie, isLoading, isError } = useMovieDetail(movieId);
  const navigate = useNavigate();
  const { favorites, setFavorites, addFavorite, removeFavorite } =useFavoriteStore();

  useEffect(() => {
    const syncFavorites = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      // 1. 컬럼을 통째로(*) 가져옵니다.
      const { data } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userData.user.id);

      if (data) {
        // 2. DB 데이터를 기존 Movie 타입에 맞게 매핑하여 배열로 만듭니다.
        const formattedMovies: Movie[] = data.map((item) => ({
          id: Number(item.movie_id),
          title: item.movie_title,
          poster_path: item.poster_path,
          vote_average: item.vote_average ?? 0,
          popularity: item.popularity ?? 0,
          release_date: item.release_date,
          overview: item.overview,
        }));

        // 3. Movie[] 객체 배열을 스토어에 통째로 세팅합니다.
        setFavorites(formattedMovies);
      }
    };

    syncFavorites();
  }, [setFavorites]);

  if (isLoading) return <MovieDetailSkeleton />;

  if (isError || !movie) {
    return <div>영화 정보를 불러오지 못했습니다.</div>;
  }

  const isFavorited = favorites.some((m) => m.id === movie.id);
  // console.log("현재 찜 상태 (isFavorited):", isFavorited);

  // 상세 페이지에 들어올 때마다 최신 찜 목록을 전역 스토어에 동기화

  const genreNames = movie.genres
    .map(
      (movieGenre) =>
        GENRES.find((genre) => genre.id === String(movieGenre.id))?.name,
    )
    .filter((name): name is string => name !== undefined);

  const director = movie.credits.crew.find(
    (person) => person.job === "Director",
  );

  const actors = movie.credits.cast.slice(0, 5);

  const handleToggleFavorite = async (
    e: React.MouseEvent | React.PointerEvent,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    if (!userData || userData.user === null) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    const userId = userData.user.id;

    if (isFavorited) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movie.id);

      if (!error) {
        removeFavorite(movie.id);
      }
    } else {
      const newFavoriteData = {
        user_id: userId,
        movie_id: movie.id,
        movie_title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average ?? 0,
        release_date: movie.release_date,
        overview: movie.overview,
      };

      const { error } = await supabase
        .from("favorites")
        .insert(newFavoriteData);

      if (!error) {
        addFavorite({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average ?? 0,
          popularity: movie.popularity ?? 0, 
          release_date: movie.release_date,
          overview: movie.overview,
        });
      }
    }
  };

  return (
    <div>
      <article className=" w-full  mb-10 border-y-2 border-main/50  bg-main/10">
        <div className="max-w-325 w-full mx-auto py-12 flex justify-between px-4">
          <div className="max-w-150">
            <h1 className="font-bold text-3xl mb-1">{movie.title}</h1>
            <div className="text-sm text-gray-500 mb-10">
              {genreNames.map((genre) => (
                <span key={genre}>{genre} </span>
              ))}
              · {movie.original_title} · {movie.release_date}
            </div>
            <div
              className={
                movie.overview?.trim()
                  ? "text-gray-800 mb-9"
                  : "text-gray-400 italic mb-9"
              }
            >
              {movie.overview && movie.overview.trim() !== ""
                ? movie.overview
                : "등록된 줄거리 정보가 없습니다."}
            </div>
            <div className="flex gap-2 mb-8">
              <Button
                className=" flex items-center gap-1"
                onClick={handleToggleFavorite}
              >
                찜하기{" "}
                <Heart
                  className={`inline-block w-4 h-4 z-30 ${isFavorited ? "fill-white text-white" : "text-white fill-black/20"}`}
                />
              </Button>
              <Button variant="secondary">리뷰 남기기</Button>
            </div>

            <div className="mb-1">
              <span className="text-gray-400">감독</span>
              <div>{director?.name}</div>
            </div>
            <div>
              <span className="text-gray-400 ">출연</span>
              <div className="flex mb-10 divide-x divide-gray-300 overflow-x-auto flex-wrap">
                {actors.map((actor) => (
                  <div key={actor.id} className="flex px-2 first:pl-0">
                    <div>{actor.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" text-gray-600 font-bold">
              TMDB <span className="text-yellow-400">★</span>{" "}
              {`${movie.vote_average.toFixed(1)}`}
            </div>
          </div>

          <div className="w-80 h-120 aspect-2/3 rounded-[10px] overflow-hidden bg-white">
            <img
              className="rounded-[10px] w-full h-full  object-cover"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              draggable={false}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
