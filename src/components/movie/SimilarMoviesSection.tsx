import { useSimilarMovies } from "@/hooks/useMovieQuery"
import MovieSlider from "../common/MovieSlider"
import type { TMDBResponse } from "@/types/movie"

interface SimilarMoviesSectionProps{
  movieId : string;
}

const SimilarMoviesSection = ({ movieId }: SimilarMoviesSectionProps) => {

  const {data ,isLoading, isError,error} = useSimilarMovies(movieId);
  
  const tmdbData = data as TMDBResponse;
  const similarMovies = tmdbData?.results ?? [];
  
  if(isError){
    return <div>비슷한 영화를 불러오지 못했습니다 : {error?.message}</div>
  }

  if(!isLoading && (!similarMovies || similarMovies?.length === 0)){
    return null;
  }

  return (
     <MovieSlider title="이 영화와 비슷한 추천 작품" movies={similarMovies} isLoading={isLoading}/>
    
  )
}
export default SimilarMoviesSection