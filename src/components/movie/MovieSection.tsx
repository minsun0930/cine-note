import { usePopularMovies } from "@/hooks/useMovie";
import { ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

interface MovieSectionProps {
  title: string;
  action?: ReactNode;
}

export default function MovieSection({
  title,

  action,
}: MovieSectionProps) {
  const { data: movies, isLoading, isError, error } = usePopularMovies();
  const navigate = useNavigate();

  //여기서 왜 useState가 아닌 useRef를 쓰는 지 알고 가기
  const scrollRef = useRef<HTMLDivElement>(null);

  const isPointerDown = useRef(false);
  const hasDragged = useRef(false);

  const startX = useRef(0);
  const startScroll = useRef(0);

  const clickedMovieId = useRef<number | null>(null);


  //마우스 눌렀을때
  const handlePointerDown = (e: React.PointerEvent , movieId :number) => {
    console.log(movieId);

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
      scrollRef.current.scrollLeft = startScroll.current - distance;
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



  if (isLoading) {
    return <div>영화 목록을 불러오는 중....</div>;
  }

  if (isError) {
    return <div>에러 발생 : {error.message}</div>;
  }

  return (
    <section className="pt-8.5 pb-7.5 ">
      <div
        className={`flex justify-between items-end  ${action ? "mb-4.5" : "mb-5"}`}
      >
        <h2 className="text-[20px] font-bold mb-">{title}</h2>
        <Link
          to="/movies"
          className="flex justify-center items-center text-[13px] text-gray-700"
        >
          더보기 <ChevronRight className="text-[13px] text-gray-700" />
        </Link>
      </div>
      {action && <div className="mb-6">{action}</div>}
      <div
        ref={scrollRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (isPointerDown.current = false)}
        className="cursor-pointer flex overflow-x-auto gap-5 pb-7.5 scrollbar-none select-none"
      >
        {movies?.map(
          (movie) =>
            movie.poster_path && (
              <div
                key={movie.id}
               onPointerDown={(e) => { handlePointerDown(e, movie.id)}}
      
              >
                <MovieCard movie={movie} />
              </div>
            )
        )}
      </div>
    </section>
  );
}
