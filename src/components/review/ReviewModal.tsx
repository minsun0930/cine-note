import { useAuthStore } from "@/store/useAuthStore";
import { X } from "lucide-react";
import Button from "../common/Button";
import type { MovieBase } from "@/types/movie";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

interface ReviewModalProps {
  movie: MovieBase;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ movie, isOpen, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  //왜 const user = useAuthStore() 이렇게 안쓰는 지 이해하기
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  if (!isOpen) return null;

  //왜 이렇게 가져오는지도 학습하기
  const nickname =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "익명 사용자";

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert({
        movie_id: String(movie.id),
        movie_title: movie.title,
        poster_path: movie.poster_path,
        user_id: user?.id,
        nickname: nickname,
        rating: rating,
        content: content,
      });
      if (error) throw error;

      alert("리뷰가 성공적으로 등록되었습니다!");

      queryClient.invalidateQueries({ queryKey: ["reviews", movie.id] });

      setContent("");
      setRating(0);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error("리뷰 등록 실패:", error.message);
      } else {
        console.error("알 수 없는 오류:", error);
      }
      alert("리뷰 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="fixed mx-auto inset-0 z-40 max-w-200 flex justify-center items-center rounded-[10px]"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-full p-10 bg-white border border-gray-400 flex flex-col gap-2 rounded-[20px]"
      >
        <div className=" flex items-center justify-between  pb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            리뷰
          </h3>
          <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>
        {/* 영화 정보 및 작성자 닉네임 요약 영역 */}
        <div className="mb-2 flex items-center gap-4 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="h-16 w-12 rounded object-cover shadow"
            />
          ) : (
            <div className="flex h-16 w-12 items-center justify-center rounded bg-gray-200 text-xs text-gray-500">
              No Image
            </div>
          )}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {movie.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              작성자:{" "}
              <span className="font-semibold text-main">{nickname}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              별점 평가
              <span className="text-main font-bold">
                ({hoverRating || rating}점)
              </span>
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const currentDisplay = hoverRating || rating;
                const isFull = currentDisplay >= star;
                const isHalf =
                  currentDisplay >= star - 0.5 && currentDisplay < star;

                return (
                  <div
                    key={star}
                    className="relative text-2xl cursor-pointer"
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {/* 왼쪽 반절 영역 (0.5점) */}
                    <div
                      className="absolute left-0 top-0 w-1/2 h-full z-10"
                      onMouseEnter={() => setHoverRating(star - 0.5)}
                      onClick={() => setRating(star - 0.5)}
                    />
                    {/* 오른쪽 반절 영역 (1점) */}
                    <div
                      className="absolute right-0 top-0 w-1/2 h-full z-10"
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={() => setRating(star)}
                    />

                    {/* 기본 회색 별 */}
                    <span className="text-gray-300 dark:text-gray-700">★</span>

                    {/* 채워진 노란색 별 */}
                    {(isFull || isHalf) && (
                      <span
                        className="absolute left-0 top-0 overflow-hidden text-yellow-400"
                        style={{ width: isHalf ? "50%" : "100%" }}
                      >
                        ★
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              리뷰 내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="영화는 어떠셨나요? 솔직한 감상평을 남겨주세요."
              rows={8}
              className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-main focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white resize-none"
              required
            />
          </div>
    
          <div className="flex mt-4">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "등록 중..." : "리뷰 남기기"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
