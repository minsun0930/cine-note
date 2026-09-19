
import { useMovies } from "@/hooks/useMovie";
import type { Movie, MovieSectionProps } from "@/types/movie";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../common/Button";
import MovieGrid from "../common/MovieGrid";

export default function MoreMoviesView({genres,selectedGenreId, onSelectGenre}: MovieSectionProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // 'smooth' 대신 'instant'를 쓰면 번쩍임 없이 즉시 맨 위로 갑니다.
  }, []);

  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const type = (searchParams.get("type") as "category" | "genre") || "category";
  const value = searchParams.get("value") || "";



  const categoryTitleMap: Record<string, string> = {
    popular: "인기 영화",
  };

  const { movies, totalResults, isLoading, isFetching, error ,totalPages } = useMovies(
    type,
    value,
    page,
  );

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    if (page === 1) {
      setAllMovies(movies);
    } else {
      setAllMovies((prev) => {
        // 중복 방지 및 누적
        const existingIds = new Set(prev.map((m) => m.id));
        const newMovies = movies.filter((m) => !existingIds.has(m.id));
        if (newMovies.length === 0) return prev; // 새로운 게 없으면 이전 상태 그대로 반환 (불필요한 렌더링 방지)
        return [...prev, ...newMovies];
      });
    }
  }, [movies, page]);

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
      <h1 className="text-2xl">{pageTitle}</h1>
      {genres && onSelectGenre  && (
             <div className=" mb-4.5 flex overflow-x-auto scrollbar-none *:mr-1.5">
               {genres.map((genre) => (
                 <Button
                   key={genre.id}
                   variant="chip"
                   onClick={() => {onSelectGenre(genre.id)
                          setSearchParams({ type: "genre", value: String(genre.id) });
                  }}
                   className={
                     selectedGenreId === genre.id ? "bg-main text-white border-main hover:bg-main" : ""
                   }
                 >
                   {genre.name}
                 </Button>
               ))}
             </div>
     )}
     <MovieGrid  totalResults={totalResults}  movies={allMovies} isLoading={isLoading && page === 1} isFetching={isFetching }/>

    <div className="flex justify-center mt-12">
        {page < (totalPages || 1) ? (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isFetching}
            className="px-8 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isFetching ? "불러오는 중..." : "더보기 +"}
          </button>
        ) : (
          allMovies.length > 0 && (
            <p className="text-sm text-gray-400">모든 영화를 불러왔습니다.</p>
          )
        )}
      </div>
    </section>
  );
}
