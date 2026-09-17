import type { Movie } from "@/types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async (category : string): Promise<Movie[]> =>{
  const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=ko-KR`);

  if(!response.ok){
    throw new Error('네트워크 응답에 실패했습니다.');
  }

  const data = await response.json();
  return data.results;
}