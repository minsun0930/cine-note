import { fetchMovies } from "@/api/tmdb";
import { useQuery } from "@tanstack/react-query";



export const useMovies = (type: "category" | "genre", value: string) => {
  const query = useQuery({
    queryKey: ["movies", type, value],
    queryFn: () => fetchMovies(type,value),
    staleTime: 1000 * 60 * 5,
    placeholderData : (previousData) => previousData,
  });
  return {
    ...query,
    movies: query.data?.results ?? [],
    totalResults: query.data?.total_results ?? 0,
    totalPages : query.data?.total_pages ?? 1,
  }
 
};
