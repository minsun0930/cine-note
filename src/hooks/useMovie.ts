import { fetchMovies } from "@/api/tmdb";
import { useQuery } from "@tanstack/react-query";

export const useMovies = (type: "category" | "genre", value: string,page:number) => {
  const query = useQuery({
    queryKey: ["movies", type, value, page],
    queryFn: () => fetchMovies(type,value,page),
    staleTime: 1000 * 60 * 5,
    placeholderData : (preoviousData) => preoviousData,
  });
  return {
    ...query,
    movies: query.data?.results || [],
    totalResults: query.data?.total_results || 0,
    totalPage : query.data?.total_pages || 1,

  }
 
};
