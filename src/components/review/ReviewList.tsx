
import type { review } from "@/types/review";
import MypageSlider from "../user/MypageSlider";
import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "@/components/skeleton/ReviewCardSkeleton";
import type { ButtonHTMLAttributes } from "react";

//화면 출력할때 쓰는 데이터 타입
export interface ReviewProps extends  ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isLoading : boolean;
  isError :boolean;
  reviews: review[];
  showMovieTitle : boolean;
}

export default function ReviewList({title, isLoading, isError, reviews, showMovieTitle , className}:ReviewProps) {

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
          <div className="py-4 px-4 text-gray-500">
          작성된 리뷰가 없습니다. 리뷰를 작성해 보세요
        </div>
        ) 
        :(
        reviews?.slice(0, 20).map(
            (review) =>
                <div key={review.id} data-slider-item className="relative ">
                  <ReviewCard
                    review={review}
                    showMovieTitle={showMovieTitle}
                    className={className}
                  />
                </div>
              
          )
        )
      }
    </MypageSlider>
  );
}
