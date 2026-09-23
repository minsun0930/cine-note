import { cn } from "@/lib/utils";
import type { Movie } from "@/types/movie";
import { Heart } from "lucide-react";
import { useState, type RefObject } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
  isGrid: boolean;
  isDragging?: RefObject<boolean>;
}

export default function MovieCard({
  movie,
  isGrid = false,
  isDragging
}: MovieCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  //나중에 zustand로 옮기기
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <article
      className={`group relative flex shrink-0 flex-col border bg-white border-gray-300 rounded-xl overflow-hidden  `}
      onClick={() => {
        if (isDragging?.current) {
          return;
        }
        navigate(`/movies/${movie.id}`);
      }}
    >
      <Heart
        className={`absolute top-1.5 right-2 w-5 h-5 z-11 ${isLiked ? "fill-main text-main" : "text-white fill-black/20"}`}
        onClick={handleLikeClick}
        onPointerDown={(e) => e.stopPropagation()}
      />

      <div
        className={` sm:group-hover:opacity-0 transition-opacity duration-400 ${isGrid ? "w-full" : "w-32 sm:w-40 md:w-45"}`}
      >
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
      </div>

      {/* 호버 시 나타날 UI */}
      <div
        className={`absolute inset-0 p-5 bg-black opacity-0 transition-opacity duration-300 sm:group-hover:opacity-100 z-10 flex flex-col justify-between ${isGrid ? "w-full" : "w-32 sm:w-40 md:w-45"}`}
      >
        <div className="flex flex-col gap-2 overflow-hidden  text-white mb-4">
          <div className="mb-4">
            <h3 className="text-[14px] font-semibold mb-1 truncate">{`${movie.title}`}</h3>
            <p className="text-[10px] text-gray-600">
              TMDB <span className="text-yellow-400">★ </span>
              {`${movie.vote_average.toFixed(1)}`}
            </p>
          </div>
          <p
            className={cn(
              movie.overview?.trim() ? "text-white " : "text-gray-400 italic",
              "text-[12px] line-clamp-7 leading-relaxed flex-1",
            )}
          >
            {movie.overview && movie.overview.trim() !== ""
              ? movie.overview
              : "등록된 줄거리 정보가 없습니다."}
          </p>
        </div>

        <div className="w-full">
          <Button
            className="w-full  font-semibold rounded-lg md:text-[12px] sm:text-[9px] whitespace-nowrap "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            리뷰 남기기
          </Button>
        </div>
      </div>
    </article>
  );
}
