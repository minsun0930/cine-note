import MovieDetail from "@/components/movie/MovieDetail"
import MovieSection from "@/components/movie/MovieSection"

const MovieDetailPage = () => {
 

  return (
    <div>
      <MovieDetail/>
      

      <MovieSection
          title="이 작품과 유사한 영화"
          type="category"
          value="popular"
      />
  
    </div>
  )
}
export default MovieDetailPage