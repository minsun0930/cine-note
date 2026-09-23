import type { Movie } from "@/types/movie";
import { useEffect, useRef, useState, type ReactNode } from "react";
import MovieCardSkeleton from "../skeleton/MovieCardSkeleton";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieSliderProps {
  title: string;
  children?: ReactNode;
  isLoading: boolean;
  movies: Movie[];
  isTop20?: boolean;
  type?: "category" | "genre";
  value?: string;
  moreLink?: boolean;
}

export default function MovieSlider({
  title,
  children,
  isLoading = false,
  isTop20 = false,
  movies,
  type,
  value,
  moreLink = true,
}: MovieSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isPointerDown = useRef(false);
  const hasDragged = useRef(false);

  const startX = useRef(0);
  const startScroll = useRef(0);

  //양 끝 확인
  const checkScrollPosition = () => {
    const slider = scrollRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;

    // 오차 범위(1px)를 두어 소수점 단위 계산 오류 방지
    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // 컴포넌트 마운트 및 영화 목록 로딩 후 스크롤 상태 체크
  useEffect(() => {
    checkScrollPosition();
    // 창 크기가 변할 때도 체크
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [movies]);

  //마우스 눌렀을때
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    const slider = scrollRef.current;
    if (!slider) return;

    isPointerDown.current = true;
    hasDragged.current = false;

    startX.current = e.clientX;
    startScroll.current = slider.scrollLeft;
  };

  // 3. 화살표 클릭 시 한 페이지(또는 카드 여러 개 분량)만큼 이동하는 함수
  const handleScrollClick = (direction: "left" | "right") => {
    const slider = scrollRef.current;
    if (!slider) return;

    const cards = slider.querySelectorAll<HTMLElement>("[data-movie-card]");
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth + 8; // 카드 너비 + gap(gap-2는 약 8px)
    const visibleWidth = slider.clientWidth; // 현재 보이는 슬라이더 영역 너비
    const scrollAmount = Math.floor(visibleWidth / cardWidth) * cardWidth; // 한 번에 넘어갈 너비 (보이는 화면 기준)

    const targetScroll =
      slider.scrollLeft +
      (direction === "right" ? scrollAmount : -scrollAmount);

    slider.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  //마우스 누른 상태에서 움직일때
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const slider = scrollRef.current;

    if (!slider || !isPointerDown.current) return;

    const distance = e.clientX - startX.current;

    // 12px 이상 움직여야 '드래그'로 인정
    if (Math.abs(distance) > 12) {
      hasDragged.current = true;
    }
    if (!hasDragged.current) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    const nextScroll = startScroll.current - distance;

    slider.scrollLeft = Math.max(0, Math.min(nextScroll, maxScroll));
     checkScrollPosition(); 
  };

  // 마우스 놓았을 때
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const slider = scrollRef.current;

    if (!slider || !isPointerDown.current) return;

    isPointerDown.current = false;

    if (!hasDragged.current) {
      return;
    }

    const distance = e.clientX - startX.current;

    if (!hasDragged.current || Math.abs(distance) < 12) {
      hasDragged.current = false;
      return;
    }

    const cards = slider.querySelectorAll<HTMLElement>("[data-movie-card]");

    if (!cards.length) {
      hasDragged.current = false;
      return;
    }

    const firstCard = cards[0];
    const secondCard = cards[1];

    let cardWidth = firstCard.offsetWidth;

    if (secondCard) {
      cardWidth = secondCard.offsetLeft - firstCard.offsetLeft;
    }

    let moveCount = 1;

    if (Math.abs(distance) > cardWidth * 2) {
      moveCount = 3;
    } else if (Math.abs(distance) > cardWidth) {
      moveCount = 2;
    }

    //드래그 방향
    const direction = distance < 0 ? 1 : -1;

    const currentIndex = Math.round(slider.scrollLeft / cardWidth);

    const maxIndex = cards.length - 1;

    const targetIndex = Math.max(
      0,
      Math.min(currentIndex + direction * moveCount, maxIndex),
    );

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const targetScroll = Math.max(
      0,
      Math.min(targetIndex * cardWidth, maxScroll),
    );

    slider.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    
  };

  const handlePointerCancel = () => {
    isPointerDown.current = false;
    hasDragged.current = false;
  };

  return (
    <section className="py-5 max-w-325 w-full mx-auto px-4 ">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-[20px] font-bold ">{title}</h2>
      </div>

      {children}

      <div
        className="relative min-h-85"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {moreLink && !isTop20 ? (
          <Link
            to={`/movies/more?type=${type}&value=${value}`}
            className="absolute right-0 -top-10 flex justify-center items-center text-[13px] text-gray-700"
          >
            더보기 <ChevronRight className="text-[13px] text-gray-700" />
          </Link>
        ) : null}

        <div className="relative ">
          <div
            ref={scrollRef}
            onScroll={checkScrollPosition}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            className="cursor-pointer flex overflow-x-auto gap-2 scrollbar-none select-none"
          >
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <MovieCardSkeleton key={index} isGrid={false} />
                ))
              : movies?.slice(0, 20).map(
                  (movie, index) =>
                    movie.poster_path && (
                      <div key={movie.id} data-movie-card className="relative ">
                        {isTop20 && (
                          <span className="absolute left-3 top-1 text-4xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">
                            {index + 1}
                          </span>
                        )}
                        <MovieCard
                          movie={movie}
                          isGrid={false}
                          isDragging={hasDragged}
                        />
                      </div>
                    ),
                )}
          </div>
          <div
            onClick={() => handleScrollClick("left")}
            className={`cursor-pointer absolute top-0 left-0 h-full w-16 text-white z-20 bg-linear-to-r from-black/80 to-transparent flex items-center justify-start pl-2 transition-opacity duration-300 
              ${isHovered && canScrollLeft ? "opacity-100" : "opacity-0"}`}
          >
            <ChevronLeft className=" w-10 h-10" />
          </div>
          <div
            onClick={() => handleScrollClick("right")}
            className={`cursor-pointer absolute top-0 right-0 h-full w-16 text-white z-20 bg-linear-to-l from-black/80 to-transparent  flex items-center justify-end pr-2 transition-opacity duration-300 
              ${isHovered&& canScrollRight ? "opacity-100" : "opacity-0"}`}
          >
            <ChevronRight className=" w-10 h-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
