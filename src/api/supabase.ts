import { supabase } from "@/supabase/supabaseClient";
import type { Movie } from "@/types/movie";

export const fetchFavoriteMovies = async (userId: string): Promise<Movie[]> => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("찜 목록 조회 에러:", error.message);
    throw new Error(error.message);
  }

  if (!data) return [];

  // Supabase 행 고유 ID 대신 TMDB의 영화 ID를 컴포넌트가 쓰는 `id`로 매핑!
  // (만약 TMDB 원본 ID가 담긴 컬럼명이 `movie_id`가 아니라면 아래 `item.movie_id` 부분을 실제 컬럼명으로 변경해주세요)
  const mappedMovies: Movie[] = data.map((item) => ({
    ...item,
    id: item.movie_id || item.id, // TMDB 아이디가 있다면 id로 덮어씌움
    title: item.movie_title || item.title,
  }));

  return mappedMovies;
};


//사용자별 리뷰 가져오기
export const fetchReviewsByMovieId = async (movieId: string) =>{
  const {data,error} = await supabase
    .from("reviews")
    .select("*")
    .eq("movie_id", movieId) 
    .order("created_at",{ascending:false})

  if(error) throw new Error(error.message);
  return data;
}

//영화별 리뷰 가져오기
export const fetchReviewsByUserId = async (userId : string) =>{
  const {data, error} = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id",userId)
    .order("created_at",{ascending:false});

  if(error) throw new Error(error.message);
  return data;
}