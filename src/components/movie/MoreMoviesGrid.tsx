import MovieCard from "@/components/movie/MovieCard";
import MovieCardSkeleton from "@/components/movie/MovieCardSkeleton";
import { useMovies } from "@/hooks/useMovie";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MovieGridSection() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // 'smooth' 대신 'instant'를 쓰면 번쩍임 없이 즉시 맨 위로 갑니다.
  }, []);

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  const type = (searchParams.get("type") as "category" | "genre") || "category";
  const value = searchParams.get("value") || "";

  const categoryTitleMap: Record<string, string> = {
    popular: "인기 영화",
  };

  const { movies, totalResults, isLoading, error } = useMovies(
    type,
    value,
    page,
  );

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
    <div className="py-8">
      <h1 className="font-bold mb-6 text-2xl">{pageTitle}</h1>
      {genres && onSelectGenre && (
        <div className=" mb-4.5 flex overflow-x-auto scrollbar-none *:mr-1.5">
          {genres.map((genre) => (
            <Button
              key={genre.id}
              variant="chip"
              onClick={() => onSelectGenre(genre.id)}
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
      <span className="text-sm text-gray-500 font-medium">
        총 {totalResults}개
      </span>
      {isLoading ? (
        Array.from({ length: 20 }).map((_, index) => (
          <MovieCardSkeleton key={index} isGrid={true} />
        ))
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {movies?.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} isGrid={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
