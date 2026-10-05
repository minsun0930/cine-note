import { useMovieReviews } from "@/hooks/useReviewQeury";
import ReviewList from "../review/ReviewList";

//화면 출력할때 쓰는 데이터 타입
export interface MovieReviewProps {
  movieId: string;
}

export default function MovieReviewSection({ movieId }: MovieReviewProps) {
  const { data: reviews, isLoading, isError } = useMovieReviews(movieId);

  return (
    <div className="py-5 max-w-325 w-full mx-auto px-8 lg:px-4">
      <ReviewList
        title="리뷰"
        reviews={reviews || []}
        isLoading={isLoading}
        isError={isError}
        showMovieTitle={false}
        className="pl-7"
      />
    </div>
  );
}
