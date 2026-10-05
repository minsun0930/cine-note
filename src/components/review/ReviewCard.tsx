import { CircleUserIcon, EllipsisVerticalIcon, Heart } from "lucide-react";
import { useState, type ButtonHTMLAttributes } from "react";
import { ReviewDetailModal } from "./ReviewDetailModal";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/hooks/auth/useAuthStore";
import { useDeleteReview } from "@/hooks/useReviewQeury";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import type { Review } from "@/types/review";
import { ReviewModal } from "./ReviewModal";

interface ReviewCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  review: Review;
  showMovieTitle?: boolean; //false면 상세페이지
}

export default function ReviewCard({
  review,
  showMovieTitle = false,
  className = "",
}: ReviewCardProps) {
  const { isOpen, setIsOpen, ref } = useOutsideClick();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // const [editingReview, setEditingReview] = useState<Review | null>(null);

  const fromattedDate = new Date(review.created_at).toLocaleDateString("ko-KR");

  const currentUser = useAuthStore((state) => state.user);
  const isMyReview = currentUser?.id && review.user_id === currentUser.id;

  const { mutate: deleteReview } = useDeleteReview();

  const handleDelete = () => {
    if (confirm("정말 이 리뷰를 삭제하시겠습니까?")) {
      deleteReview(review.id);
    }
  };

  const handleOpenEdit = () => {
    setIsOpen(false);
    setIsEditModalOpen(true);
  };

  // 💡 5점 만점을 기준으로 별 아이콘을 동적으로 그려주는 함수
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // 꽉 찬 별
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>,
        );
      } else if (rating >= i - 0.5) {
        // 반쪽 별 (0.5점 단위 지원 시)
        stars.push(
          <span key={i} className="text-yellow-400 relative">
            <span className="absolute overflow-hidden w-[50%] text-yellow-400">
              ★
            </span>
            <span className="text-gray-300 dark:text-gray-700">★</span>
          </span>,
        );
      } else {
        // 빈 별
        stars.push(
          <span key={i} className="text-gray-300 dark:text-gray-700">
            ★
          </span>,
        );
      }
    }
    return stars;
  };

  return (
    <article className="flex flex-col h-full w-75 p-5 border rounded-[10px] max-w-70 bg-white">
      <div className="flex justify-between relative">
        {showMovieTitle ? (
          <Link
            to={`/movies/${review.movie_id}`}
            className="font-bold text-[16px]"
          >
            {review.movie_title}
          </Link>
        ) : (
          <div className="flex items-center gap-2 ">
            <CircleUserIcon className="w-5 h-5" />
            <div className="font-semibold text-[16px]">{review.nickname}</div>
          </div>
        )}

        {isMyReview && (
          <div ref={ref}>
            <EllipsisVerticalIcon
              className="relative group w-4 h-4 cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
            {isOpen && (
              <div className="absolute right-0 top-full pt-2 whitespace-nowrap z-20">
                <div className="flex flex-col border p-6 text-sm bg-white gap-2 py-4 rounded-[10px] shadow-md">
                  <div
                    className="hover:font-bold transition flex justify-center items-center"
                    onClick={handleOpenEdit}
                  >
                    수정
                  </div>
                  <div
                    className="hover:font-bold transition cursor-pointer"
                    onClick={handleDelete}
                  >
                    삭제
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={`flex flex-col flex-1 w-full ${className}`}>
        <div>{renderStars(review.rating)}</div>

        <div className=" my-2 text-sm line-clamp-3 leading-relaxed break-keep ">
          {review.content}
        </div>

        {review.content.length > 80 && (
          <div className="flex justify-end mb-3">
            <button
              onClick={() => setIsDetailModalOpen(true)}
              className="text-xs font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 underline underline-offset-4"
            >
              더보기
            </button>
          </div>
        )}

        <div className="flex justify-between items-end gap-1  cursor-pointer mt-auto">
          <div className="text-[10px] text-gray-600 mb-">{fromattedDate}</div>
          <div className="flex gap-1">
            <span className="flex items-center"></span>
            <span className="flex items-center">
              <Heart className=" w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      <ReviewDetailModal
        review={review}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
      <ReviewModal
        movie={{
          id: Number(review.movie_id),
          title: review.movie_title,
          poster_path: review.poster_path ?? "",
        }}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editReview={review} 
      />
    </article>
  );
}
