import type { Movie } from "@/types/movie";
import { Heart } from "lucide-react";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
  isGrid :boolean;
  onClick? : () => void;
}

export default function MovieCard({ movie ,isGrid=false, onClick }: MovieCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  //나중에 zustand로 옮기기
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <article onClick={onClick}  className={`relative flex shrink-0 flex-col border bg-white border-gray-300 rounded-xl overflow-hidden ${isGrid ? ("w-full"):("w-32 sm:w-40 md:w-45")}  `} >
      <Heart
        className={`absolute top-1.5 right-2 w-5 h-5 z-10 ${isLiked ? "fill-main text-main" : "text-white fill-black/20"}`}
        onClick={handleLikeClick}
        onPointerDown={(e) => e.stopPropagation()}
      />
      <img
        className="w-full aspect-2/3 object-cover"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title}`}
        draggable={false}
      />
      <div className="px-3 pt-3 pb-4 " draggable={false}>
        <h3 className="text-[14px] font-semibold mb-1 truncate">{`${movie.title}`}</h3>
        <p className="text-[10px] text-gray-600">
          TMDB <span className="text-yellow-400">★</span>{" "}
          {`${movie.vote_average.toFixed(1)}`}
        </p>
      </div>
    </article>
  );
}
