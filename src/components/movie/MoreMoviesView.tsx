import type { MoreMoviesViewProps} from "@/types/movie";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../common/Button";
import MovieGrid from "../common/MovieGrid";
import { useInfiniteMovies } from "@/hooks/useInfiniteMovies";

export default function MoreMoviesView({
  genres,
  selectedGenreId,
  onSelectGenre,
}: MoreMoviesViewProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // 'smooth' 대신 'instant'를 쓰면 번쩍임 없이 즉시 맨 위로 갑니다.
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <section>
      <div className="flex sticky top-0 bg-white flex-col z-20">
        <h1 className="text-2xl mt-3 font-bold">{pageTitle}</h1>
        {genres && (
          <div className="mt-7 mb-4.5 flex overflow-x-auto scrollbar-none *:mr-1.5">
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
      </div>
      <MovieGrid
        movies={movies}
        isLoading={isLoading }
        isFetching={isFetchingNextPage}
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
