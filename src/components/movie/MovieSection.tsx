import { useMovies } from "@/hooks/useMovie";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import Button from "../common/Button";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Genre {
  name: string;
  id: string;
}

interface MovieSectionProps {
  title: string;
  type: "category" | "genre";
  value: string;
  isTop20?: boolean;
  genres?: Genre[];
  selectedGenreId?: string;
  onSelectGenre?: (id: string) => void; // 장르 변경 함수
} 

export default function MovieSection({
  title,
  isTop20 = false,
  type,
  value,
  genres,
  selectedGenreId,
  onSelectGenre,
}: MovieSectionProps) {
  const { data: movies, isFetching, isError, error } = useMovies(type, value);
  const navigate = useNavigate();

  //여기서 왜 useState가 아닌 useRef를 쓰는 지 알고 가기
  const scrollRef = useRef<HTMLDivElement>(null);

  const isPointerDown = useRef(false);
  const hasDragged = useRef(false);

  const startX = useRef(0);
  const startScroll = useRef(0);

  const clickedMovieId = useRef<number | null>(null);

  //마우스 눌렀을때
  const handlePointerDown = (e: React.PointerEvent, movieId: number) => {
    if (e.button !== 0) return;

    if (!scrollRef.current) return;

    isPointerDown.current = true;
    hasDragged.current = false;

    startX.current = e.clientX;
    startScroll.current = scrollRef.current.scrollLeft;

    clickedMovieId.current = movieId;
  };

  //마우스 누른 상태에서 움직일때
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current || !isPointerDown.current) return;

    const distance = e.clientX - startX.current;

    // 12px 이상 움직여야 '드래그'로 인정
    if (Math.abs(distance) > 12) {
      hasDragged.current = true;
      clickedMovieId.current = null;
    }

    if (hasDragged.current) {
      scrollRef.current.scrollLeft = startScroll.current - distance * 1.3;
    }
  };

  // click 이벤트 충돌을 피하기 위해, 손을 뗄 때(pointerUp) 드래그가 아니었다면 여기서 바로 페이지를 이동
  const handlePointerUp = () => {
    isPointerDown.current = false;

    // 드래그를 하지 않았고(순수 클릭), movieId가 존재한다면 페이지 이동!
    if (!hasDragged.current && clickedMovieId.current !== null) {
      navigate(`/movies/${clickedMovieId.current}`);
    }
    clickedMovieId.current = null;
  };

  if (isError) {
    return <div>에러 발생 : {error.message}</div>;
  }

  return (
    <section className="pt-8.5 pb-7.5 ">
      <div className="flex justify-between items-end mb-5">
        <h2 className="text-[20px] font-bold ">{title}</h2>
      </div>

      {genres && onSelectGenre && (
        <div className="mt-2 mb-4.5 flex overflow-x-auto scrollbar-none *:mr-1.5">
          {genres.map((genre) => (
            <Button
              key={genre.id}
              variant="chip"
              onClick={() => onSelectGenre(genre.id)}
              className={
                selectedGenreId === genre.id ? "bg-main text-white border-main hover:bg-main" : ""
              }
            >
              {genre.name}
            </Button>
          ))}
        </div>
      )}

      <div className="relative min-h-85">
        {!isTop20 ? (
          <Link
            to={`/movies/more?type=${type}&value=${value}`}
            className="absolute right-0 -top-10 flex justify-center items-center text-[13px] text-gray-700"
          >
            더보기 <ChevronRight className="text-[13px] text-gray-700" />
          </Link>
        ) : null}

        <div
          ref={scrollRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => (isPointerDown.current = false)}
          className="cursor-pointer flex overflow-x-auto gap-5 scrollbar-none select-none"
        >
          {isFetching || isFetching ? (
            Array.from({ length: 5 }).map((_, index) => (
               <MovieCardSkeleton key={index} />
          ))
          ) : (
            movies?.slice(0, 20).map(
              (movie, index) =>
                movie.poster_path && (
                  <div
                    key={movie.id}
                    onPointerDown={(e) => {
                      handlePointerDown(e, movie.id);
                    }}
                    className="relative"
                  >
                    {isTop20 && (
                      <span className="absolute left-3 top-1 text-4xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">
                        {index + 1}
                      </span>
                    )}
                    <MovieCard movie={movie} />
                  </div>
                )
            )
          )}
        </div>
      </div>
    </section>
  );
}
