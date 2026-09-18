import type { Movie } from "@/types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  type: "category" | "genre",
  value: string,
): Promise<Movie[]> => {
  let url = '';

  if (type === "category") {
    url = `${BASE_URL}/movie/${value}?api_key=${API_KEY}&language=ko-KR`;
  } else if (type === 'genre'){
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${value}`
  }

  const response =  await fetch(url);

  if (!response.ok) {
    throw new Error("네트워크 응답에 실패했습니다.");
  }

  const data = await response.json();
  return data.results;
};
