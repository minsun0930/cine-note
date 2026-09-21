import type { MovieDetail, TMDBResponse } from "@/types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  type: "category" | "genre",
  value: string,
  page : number =1,
): Promise<TMDBResponse> => {
  let url = '';

  if (type === "category") {
    url = `${BASE_URL}/movie/${value}?api_key=${API_KEY}&language=ko-KR&page=${page}`;
  } else if (type === 'genre'){
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&page=${page}&with_genres=${value}`
  }

  const response =  await fetch(url);

  if (!response.ok) {
    throw new Error("네트워크 응답에 실패했습니다.");
  }

  const data = await response.json();
  return data;
};



export const fetchMovieDetail = async(id:string): Promise<MovieDetail> =>{
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=credits` ;

  const response = await fetch(url);

  if(!response.ok){
    throw new Error("영화 상세 정보를 불러오지 못했습니다.");
  }

  return await response.json();
}