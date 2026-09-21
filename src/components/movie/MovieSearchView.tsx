// import MovieGrid from "../common/MovieGrid"

import { useSearchParams } from "react-router-dom";

const MovieSearchView = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") ?? "";

  return (
    <div>
      <h1>"{keyword}"의 검색 결과</h1>
      {/* <MovieGrid/> */}
    </div>
  )
}
export default MovieSearchView