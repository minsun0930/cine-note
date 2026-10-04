
import {useUserReviews } from "@/hooks/useMovieQuery";
import { useAuthStore } from "@/store/useAuthStore";
import ReviewList from "../review/ReviewList";

export default function MyReviewSection() {
  const { user } = useAuthStore();

  console.log("현재 로그인한 유저:", user);
  const {data: reviews, isLoading, isError} = useUserReviews(user?.id)
  console.log("불러온 리뷰 데이터:", reviews);

  return (
    <ReviewList 
      title="리뷰"
      reviews={reviews || []}
      isLoading={isLoading} 
      isError={isError} 
      showMovieTitle={true} 
    />
  );
}
