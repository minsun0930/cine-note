// import MovieGrid from "../common/MovieGrid"

import { useSearchMovies } from "@/hooks/useMovieQuery";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieGrid from "../common/MovieGrid";
import { useState } from "react";

const MovieSearchView = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") ?? "";
  const navigate = useNavigate();
  // 2. 정렬 옵션 상태 관리 (기본값: 인기순)
  const [sortOption, setSortOption] = useState<
    "popularity" | "latest" | "rating"
  >("popularity");

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

  // 3. ★ 여기에 정렬 로직을 넣어줍니다! (가져온 movies를 정렬)
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOption === "popularity") {
      return b.popularity - a.popularity;
    } else if (sortOption === "latest") {
      if (!a.release_date) return 1;
      if (!b.release_date) return -1;
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    } else if (sortOption === "rating") {
      return b.vote_average - a.vote_average;
    }
    return 0;
  });

  return (
    <div className="">
      <h1 className="text-2xl font-bold">"{keyword}"의 검색 결과</h1>

      <select
        value={sortOption}
        onChange={(e) =>
          setSortOption(e.target.value as "popularity" | "latest" | "rating")
        }
        className="absolute right-0 top-12 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white mr-4"
      >
        <option value="popularity">인기순</option>
        <option value="latest">최신순</option>
        <option value="rating">평점 높은 순</option>
      </select>

      <MovieGrid
        totalResults={totalResults}
        movies={sortedMovies}
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
