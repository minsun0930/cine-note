import { useAuthStore } from "@/hooks/auth/useAuthStore";
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

  // Supabase 행 고유 ID 대신 TMDB의 영화 ID를 컴포넌트가 쓰는 `id`로 매핑
  const mappedMovies: Movie[] = data.map((item) => ({
    ...item,
    id: item.movie_id || item.id, // TMDB 아이디가 있다면 id로 덮어씌움
    title: item.movie_title || item.title,
  }));

  return mappedMovies;
};

//영화별 리뷰 가져오기
export const fetchReviewsByMovieId = async (movieId: string) => {
  const currentUserId = useAuthStore.getState().user?.id;

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      review_likes (user_id)
    `,
    )
    .eq("movie_id", movieId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("리뷰 목록 조회 실패:", error);
    throw new Error(error.message);
  }

  const formattedReviews = data.map((review) => {
    const likes = review.review_likes || [];
    const likeCount = likes.length;
    const isLiked = currentUserId
      ? likes.some(
          (like: { user_id: string }) => like.user_id === currentUserId,
        )
      : false;

    return {
      ...review,
      likeCount,
      isLiked,
    };
  });

  return formattedReviews;
};

//사용자별 리뷰 가져오기
export const fetchReviewsByUserId = async (userId: string) => {
  const currentUserId = useAuthStore.getState().user?.id;

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      review_likes (user_id)
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  const formattedReviews = data.map((review) => {
    const likes = review.review_likes || [];
    const likeCount = likes.length;
    const isLiked = currentUserId
      ? likes.some(
          (like: { user_id: string }) => like.user_id === currentUserId,
        )
      : false;

    return {
      ...review,
      likeCount,
      isLiked,
    };
  });

  return formattedReviews;
};

// rating 가져오는 함수 영화 평점 평균 보여줄때
export const fetchMovieRatingStats = async (movieId: string) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("movie_id", movieId);

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) return { averageRating: 0, reviewCount: 0 };

  const totalRating = data.reduce((sum, review) => sum + review.rating, 0);
  const avg = totalRating / data.length;

  return {
    averageRating: Number(avg.toFixed(1)),
    reviewCount: data.length,
  };
};
