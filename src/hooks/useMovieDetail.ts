import { fetchMovieDetail } from "@/api/tmdb"
import type { MovieDetail } from "@/types/movie"
import { useQuery } from "@tanstack/react-query"

export const useMovieDetail=  (id?:string )=>{
  return useQuery<MovieDetail>({
    queryKey: ["movie",id],
    queryFn :() => fetchMovieDetail(id!),
    enabled : !!id,
    staleTime : 1000 * 60 * 5,
  })
}