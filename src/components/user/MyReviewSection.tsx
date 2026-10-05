
import {useUserReviews } from "@/hooks/useMovieQuery";
import { useAuthStore } from "@/hooks/auth/useAuthStore";
import ReviewList from "../review/ReviewList";

export default function MyReviewSection() {
  const { user } = useAuthStore();

  const {data: reviews, isLoading, isError} = useUserReviews(user?.id)


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
