import { cn } from "@/lib/utils";
import type { Movie } from "@/types/movie";
import { Heart } from "lucide-react";
import Button from "./Button";

import { useContext, useState, type RefObject } from "react";
import { SliderContext } from "@/context/SliderContext";
import { useFavoriteToggle } from "@/hooks/useMovieQuery";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { ReviewModal } from "../review/ReviewModal";

interface MovieCardProps {
  movie: Movie;
  isGrid: boolean;
  isDragging?: RefObject<boolean>;
}

export default function MovieCard({
  movie,
  isGrid = false,
  isDragging: propsIsDragging,
}: MovieCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderContext = useContext(SliderContext);
  const isDragging = propsIsDragging ?? sliderContext?.isDragging;
  const navigate = useNavigate();

  const { isFavorited, handleToggleFavorite } = useFavoriteToggle(movie);

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
      <div
        className="absolute top-1.5 right-2  z-20 p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Heart
          className={`w-5 h-5 z-30 ${isFavorited ? "fill-main text-white" : "text-white fill-black/20"}`}
          onClick={handleToggleFavorite}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </div>
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

              const currentUser = useAuthStore.getState().user; 

              if (!currentUser) {
                alert("로그인이 필요한 서비스입니다.");
                navigate("/login"); // 혹은 로그인 모달 열기
                return;
              }

              setIsModalOpen(true);
            }}
          >
            리뷰 남기기
          </Button>
        </div>
      </div>
      
      <ReviewModal
        movie={movie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </article>
  );
}
