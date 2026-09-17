import { fetchPopularMovies } from "@/api/tmdb"
import type { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const usePopularMovies = () =>{
  return useQuery<Movie[],Error>({
    queryKey : ['popularMovies'],
    queryFn : () => fetchPopularMovies('popular'),
  });
}