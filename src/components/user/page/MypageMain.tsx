
import MovieFavoirteSection from "../MovieFavoriteSection";
import MyReviewSection from "../MyReviewSection";


export default function MypageMain(){
 
  return (
    <div className="grow max-w-235 px-2 min-w-0">
      <MyReviewSection />
      <MovieFavoirteSection title="찜 목록" />
    </div>
  )
}