import { fetchMovies } from "@/api/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteMovies = (
  type: "category" | "genre",
  value: string,
) => {
  const query = useInfiniteQuery({
    queryKey: ["movies-infinite", type, value],

    queryFn: ({ pageParam }) => {
      return fetchMovies(type, value, pageParam);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }

      return undefined;
    },

    staleTime: 1000 * 60 * 5,
  });

  // 지금까지 불러온 모든 페이지의 영화를 하나의 배열로 합침
  const movies = query.data?.pages.flatMap((page) => page.results) ?? [];

  // 전체 영화 개수
  const totalResults = query.data?.pages[0]?.total_results ?? 0;

  return {
    ...query,
    movies,
    totalResults,
  };
};
