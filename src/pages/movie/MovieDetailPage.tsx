import MovieDetail from "@/components/movie/MovieDetail";
import MovieReviewSection from "@/components/movie/MovieReviewSection";

import SimilarMoviesSection from "@/components/movie/SimilarMoviesSection";
import { useParams } from "react-router-dom";


const MovieDetailPage = () => {
  const { movieId } = useParams();
  if (!movieId) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div>
      <MovieDetail />
      <MovieReviewSection movieId={movieId} />
      <SimilarMoviesSection movieId={movieId} />
    </div>
  );
};
export default MovieDetailPage;
