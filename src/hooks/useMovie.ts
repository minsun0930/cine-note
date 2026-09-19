import { fetchMovies } from "@/api/tmdb";
import type { TMDBResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";



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