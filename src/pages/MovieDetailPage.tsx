import MovieDetail from "@/components/movie/MovieDetail"
import { useMovieDetail } from "@/hooks/useMovieDetail";
import { useParams } from "react-router-dom"

const MovieDetailPage = () => {
  const {movieId} = useParams();
  const {data:movie,isLoading,isError} = useMovieDetail(movieId);

  if(isLoading) return <div>영화 데이터를 가져오는 중...</div>
  if(isError) return <div>에러 발생</div>

  return (
    <div>
      <MovieDetail movie={movie}/>
    </div>
  )
}
export default MovieDetailPage