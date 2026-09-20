import { fetchMovieDetail } from "@/api/tmdb"
import { useQuery } from "@tanstack/react-query"

export const useMovieDetail=  (id?:string )=>{
  return useQuery({
    queryKey: ["movie",id],
    queryFn :() => fetchMovieDetail(id!),
    enabled : !!id,
    staleTime : 1000 * 60 * 5,
  })
}