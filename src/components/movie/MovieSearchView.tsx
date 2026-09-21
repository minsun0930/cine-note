// import MovieGrid from "../common/MovieGrid"

import { useSearchMovies } from "@/hooks/useMovieQuery";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieGrid from "../common/MovieGrid";

const MovieSearchView = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") ?? "";
  const navigate = useNavigate();

  const {
    movies,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    totalResults,
  } = useSearchMovies(keyword);

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        에러 발생: {error.message}
      </div>
    );
  }

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold">"{keyword}"의 검색 결과</h1>
      <MovieGrid
        totalResults={totalResults}
        movies={movies}
        isLoading={isLoading}
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
    </div>
  );
};
export default MovieSearchView;
