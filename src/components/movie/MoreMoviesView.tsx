import type { Genre} from "@/types/movie";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../common/Button";
import MovieGrid from "../common/MovieGrid";
import { useInfiniteMovies } from "@/hooks/useMovieQuery";



export interface MoreMoviesViewProps {
  genres?: Genre[];
  selectedGenreId?: string;
  onSelectGenre?: (id: string) => void;
}


export default function MoreMoviesView({
  genres,
  selectedGenreId,
  onSelectGenre,
}: MoreMoviesViewProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // 'smooth' 대신 'instant'를 쓰면 번쩍임 없이 즉시 맨 위로 갑니다.
  }, [selectedGenreId]);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = (searchParams.get("type") as "category" | "genre") || "category";
  const value = searchParams.get("value") || "";

  const categoryTitleMap: Record<string, string> = {
    popular: "인기 영화",
  };

  const {
    movies,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteMovies(type, value);


  const pageTitle =
    type === "category"
      ? categoryTitleMap[value] || "카테고리"
      : "장르별 영화 목록";

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        에러 발생: {error.message}
      </div>
    );
  }

  const handleMovieClick = (movieId : number) =>{
    navigate(`/movies/${movieId}`)
  }


  return (
    <section>
      <h1 className="text-2xl mt-3 font-bold">{pageTitle}</h1>
        {type === "genre" && genres &&  (
          <div className="sticky top-13 z-20 bg-white py-4.5 flex overflow-x-auto scrollbar-none *:mr-1.5">
            {genres.map((genre) => (
              <Button
                key={genre.id}
                variant="chip"
                onClick={() => {
                  onSelectGenre?.(genre.id);
                  setSearchParams({ type: "genre", value: String(genre.id) });
                }}
                className={
                  selectedGenreId === genre.id
                    ? "bg-main text-white border-main hover:bg-main"
                    : ""
                }
              >
                {genre.name}
              </Button>
            ))}
          </div>
        )}
   
      <MovieGrid
        movies={movies}
        isLoading={isLoading }
        isFetching={isFetchingNextPage}
        onMovieClick={handleMovieClick}
      />

      <div className="flex justify-center my-12 ">
         {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className=" px-8 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isFetchingNextPage ? "불러오는 중..." : "더보기 +"}
          </button>
        ) : (
          movies.length > 0 && (
            <p className="text-sm text-gray-400">모든 영화를 불러왔습니다.</p>
          )
        )}
      </div>
    </section>
  );
}
