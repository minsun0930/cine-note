
import {useUserReviews } from "@/hooks/useMovieQuery";
import { useAuthStore } from "@/store/useAuthStore";
import MypageSlider from "./MypageSlider";
import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "@/components/skeleton/ReviewCardSkeleton";

//화면 출력할때 쓰는 데이터 타입
export interface MyReviewProps {
  title: string;
}

export default function MyReviewSection({title}:MyReviewProps) {
  const { user } = useAuthStore();

  console.log("현재 로그인한 유저:", user);
  const {data: reviews, isLoading, isError} = useUserReviews(user?.id)
  console.log("불러온 리뷰 데이터:", reviews);

  return (
    <MypageSlider
      title={title}
    >
      {isLoading ? 
        ( Array.from({ length: 10 }).map((_, index) => (
            <ReviewCardSkeleton key={index}/>
          ))
        )
        : isError ? (
        <div className="py-4 px-4 text-red-500">
          데이터를 불러오지 못했습니다.
        </div>
        ) : reviews?.length === 0 ? (
          <div className="py-4 px-4 text-red-500">
          데이터를 불러오지 못했습니다.
        </div>
        ) 
        :(
        reviews?.slice(0, 20).map(
            (review) =>
              
                <div key={review.id} data-slider-item className="relative ">
                  <ReviewCard
                    review={review}
                    showMovieTitle={true}
                  />
                </div>
              
          )
        )
      }
    </MypageSlider>
  );
}
