
import MovieFavoirteSection from "./MovieFavoriteSection";
import MyReviewSection from "./MyReviewSection";


export default function MypageMain(){
 
  return (
    <div className="grow max-w-230 px-2 min-w-0">
      <MyReviewSection title="내가 쓴 리뷰" />
      <MovieFavoirteSection title="찜 목록" />
    </div>
  )
}