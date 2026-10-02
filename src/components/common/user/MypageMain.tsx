
import { useFavoriteStore } from "@/store/useFavoriteStore";
import MovieFavoirteSection from "./MovieFavoriteSection";

export default function MypageMain(){
  const { favorites } = useFavoriteStore();

  if (favorites.length === 0) return null;

  return (
    <div className="grow max-w-230 px-2 min-w-0">
      <MovieFavoirteSection title="찜 목록" />
    </div>
  )
}