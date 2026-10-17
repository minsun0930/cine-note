import {
  fetchMovieRatingStats,
  fetchReviewsByMovieId,
  fetchReviewsByUserId,
} from "@/api/supabase";
import { supabase } from "@/supabase/supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "./auth/useAuthStore";
import { useNavigate } from "react-router-dom";

//특정 영화 리뷰 목록 가져오기
export const useMovieReviews = (movieId: string) => {
  return useQuery({
    queryKey: ["reviews", movieId],
    queryFn: () => fetchReviewsByMovieId(movieId),
    enabled: !!movieId,
  });
};

//특정 유저가 작정한 리뷰 목록 가져오기
export const useUserReviews = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["reviews", userId],
    queryFn: () => fetchReviewsByUserId(userId!),
    enabled: !!userId,
  });
};

//리뷰 등록 훅(Mutation)
export const useAddReview = (movieId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newReviewData: {
      movie_title: string;
      poster_path: string | null;
      user_id: string;
      nickname: string;
      rating: number;
      content: string;
    }) => {
      const { error } = await supabase.from("reviews").insert({
        movie_id: movieId,
        ...newReviewData,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      alert("리뷰가 성공적으로 등록되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.error("리뷰 등록 실패 : ", error.message);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    },
  });
};

//리뷰 수정 훅(Mutation)
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewId,
      newContent,
      newRating,
    }: {
      reviewId: string;
      newContent: string;
      newRating: number;
    }) => {
      const { error } = await supabase
        .from("reviews")
        .update({ content: newContent, rating: newRating })
        .eq("id", reviewId);
      if (error) throw error;
    },
    onSuccess: () => {
      alert("리뷰가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.error("수정 실패:", error.message);
      alert("리뷰 수정 중 오류가 발생했습니다.");
    },
  });
};

//리뷰 삭제 훅
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);
      if (error) throw error;
    },
    onSuccess: () => {
      alert("리뷰가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.error("삭제 실패 : ", error.message);
      alert("리뷰 삭제 중 오류가 발생했습니다.");
    },
  });
};

//리뷰 갯수랑 평점 가져오기
export const useMovieRatingStats = (movieId: string) => {
  return useQuery({
    queryKey: ["movieRatingStats", movieId],
    queryFn: () => fetchMovieRatingStats(movieId),
    enabled: !!movieId,
  });
};





//리뷰 좋아요 토글 함수 및 훅
export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({
      reviewId,
      isLiked,
    }: {
      reviewId: string;
      isLiked: boolean;
    }) => {
      if (!currentUser) throw new Error("로그인이 필요합니다.");

      if (isLiked) {
        const { error } = await supabase
          .from("review_likes")
          .delete()
          .eq("review_id", reviewId)
          .eq("user_id", currentUser.id);

        if (error) throw error;
      } else {
        // 아직 안 눌렀다면 -> 추가 (Like)
        const { error } = await supabase.from("review_likes").insert({
          review_id: reviewId,
          user_id: currentUser.id,
        });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.error("좋아요 처리 실패:", error.message);
    },
  });

  const handleToggleLike = (reviewId: string, isLiked: boolean) => {
    // 1. 로그인 여부 체크
    if (!currentUser) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login"); // 혹은 로그인 모달 열기
      return;
    }

    // 2. 뮤테이션 실행
    mutation.mutate({ reviewId, isLiked });
  };

  return { handleToggleLike, isPending: mutation.isPending };
};
