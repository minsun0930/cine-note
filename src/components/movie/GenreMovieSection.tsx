import { useMovies } from "@/hooks/useMovie";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import Button from "../common/Button";

const GENRES = [
  { name: "로맨스", id: "10749" },
  { name: "스릴러", id: "53" },
  { name: "SF", id: "878" },
  { name: "코미디", id: "35" },
  { name: "액션", id: "28" },
  { name: "추리", id: "9648" },
  { name: "애니메이션", id: "16" },
];

interface MovieSectionProps {
  title: string;
}

export default function GenreMovieSection({
  title
}: MovieSectionProps) {
  // 기본 선택된 장르 ID (예: 액션 = '28')
  const [selectedGenreId, setSelectedGenreId] = useState('28');



  const { data: movies, isFetching, isError, error } = useMovies('genre',selectedGenreId);

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
      <div
        className={`flex justify-between items-end`}
      >
        <h2 className="text-[20px] font-bold ">{title}</h2>
      </div>
      {/* 장르 칩 버튼 목록 */}
      <div className="mt-2 mb-4.5 flex overflow-x-auto scrollbar-none *:mr-1">
        {GENRES.map((genre) => (
          <Button 
            key={genre.id}
            variant="chip"
            onClick={() => setSelectedGenreId(genre.id)}
            className={selectedGenreId === genre.id ? 'bg-main text-black' : ''}
          >
            {genre.name}
          </Button>
        ))}
      </div>
      <div className="relative">
        <Link
         to={`/movies/more?type=genre&id=${selectedGenreId}`}
          className="absolute right-0 -top-10 flex justify-center items-center text-[13px] text-gray-700"
        >
          더보기 <ChevronRight className="text-[13px] text-gray-700" />
        </Link>
        <div
          ref={scrollRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => (isPointerDown.current = false)}
          className="cursor-pointer flex overflow-x-auto gap-5 scrollbar-none select-none"
        >
        {isFetching ? (
          <div>
            영화 로딩중...
          </div>
        ):(
            movies?.slice(0, 20).map(
            (movie) =>
              movie.poster_path && (
                <div
                  key={movie.id}
                  onPointerDown={(e) => {
                    handlePointerDown(e, movie.id);
                  }}
                >
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
