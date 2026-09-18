import { fetchMovies } from "@/api/tmdb";
import type { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const useMovies = (type: "category" | "genre", value: string) => {
  return useQuery<Movie[], Error>({
    queryKey: ["movies", type, value],
    queryFn: () => fetchMovies(type,value),
    // staleTime: 1000 * 60 * 5,
  });
};
