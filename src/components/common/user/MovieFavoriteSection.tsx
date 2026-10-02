
import { useFavoriteMovies } from "@/hooks/useMovieQuery";
import MovieCardSkeleton from "@/components/skeleton/MovieCardSkeleton";
import MovieCard from "../MovieCard";
import { useAuthStore } from "@/store/useAuthStore";
import MypageSlider from "./MypageSlider";

//화면 출력할때 쓰는 데이터 타입
export interface MovieFavoriteProps {
  title: string;
}

export default function MovieFavoirteSection({title}:MovieFavoriteProps) {
  const { user } = useAuthStore();
  const {data: movies, isLoading, isError} = useFavoriteMovies(user?.id);
  

  if (isError) {
    return <div className="py-4 px-4 text-red-500">데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <MypageSlider
      title={title}
    >
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} isGrid={false} />
          ))
        : movies?.slice(0, 20).map(
            (movie) =>
              movie.poster_path && (
                <div key={movie.id} data-slider-item className="relative ">
                  <MovieCard
                    movie={movie}
                    isGrid={false}
                  />
                </div>
              ),
          )}
    </MypageSlider>
  );
}
