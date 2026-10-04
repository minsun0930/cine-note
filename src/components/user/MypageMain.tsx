
import MovieFavoirteSection from "./MovieFavoriteSection";
import MyReviewSection from "./MyReviewSection";


export default function MypageMain(){
 
  return (
    <div className="grow max-w-230 px-2 min-w-0">
      <MyReviewSection />
      <MovieFavoirteSection title="찜 목록" />
    </div>
  )
}