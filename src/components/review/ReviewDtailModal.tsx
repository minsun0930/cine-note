import { createPortal } from "react-dom";

interface ReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    movie_title?: string;
    nickname: string;
    rating: number;
    content: string;
    created_at: string;
  };
}

export function ReviewDetailModal({ isOpen, onClose, review }: ReviewDetailModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
        {/* 영화 제목 (마이페이지 등에서 유용) */}
        {review.movie_title && (
          <h3 className="text-sm font-semibold text-gray-500 mb-1">{review.movie_title}</h3>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-lg">{review.nickname}</span>
          <span className="text-yellow-500 font-semibold">★ {review.rating}</span>
        </div>

        {/* 전체 내용 */}
        <p className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {review.content}
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            닫기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}