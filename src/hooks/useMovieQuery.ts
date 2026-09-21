import { fetchMovieDetail, fetchMovies, fetchSimilarMovies} from "@/api/tmdb";
import type { MovieDetail, TMDBResponse } from "@/types/movie";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";


//영화 리스트 가져오기
export const useMovies = (
  type: "category" | "genre",
  value: string
) => {
  return useQuery<TMDBResponse, Error>({
    queryKey: ["movies", type, value],
    queryFn: () => fetchMovies(type, value),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });
};



//영화 리스트 추가로 가져오기
export const useInfiniteMovies = (
  type: "category" | "genre",
  value: string,
) => {
  const query = useInfiniteQuery({
    queryKey: ["movies-infinite", type, value],

    queryFn: ({ pageParam }) =>  fetchMovies(type, value, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => 
      lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined,

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


//영화 상세 정보 가져오기
export const useMovieDetail=  (id?:string )=>{
  return useQuery<MovieDetail>({
    queryKey: ["movie",id],
    queryFn :() => fetchMovieDetail(id!),
    enabled : !!id,
    staleTime : 1000 * 60 * 5,
  })
}



//유사한 영화 데이터 가져오기
export const useSimilarMovies = (id?:string) =>{
  return useQuery({
    queryKey: ["movieSimilar", id],
    queryFn:()=>fetchSimilarMovies(id!),
    enabled: !!id,
    staleTime:1000*60*5,
  })
}