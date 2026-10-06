import { Heart } from "lucide-react";
import Button from "../common/Button";
import { GENRES } from "@/data/genres";
import type { MovieDetail } from "@/types/movie";
import { useNavigate, useParams } from "react-router-dom";
import MovieDetailSkeleton from "../skeleton/MovieDetailSkeleton";
import { useFavoriteToggle, useMovieDetail } from "@/hooks/useMovieQuery";
import { ReviewModal } from "../review/ReviewModal";
import { useState } from "react";
import { useAuthStore } from "@/hooks/auth/useAuthStore";
import { useMovieRatingStats } from "@/hooks/useReviewQeury";

export default function MovieDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { movieId } = useParams();
  const { data: movie, isLoading, isError } = useMovieDetail(movieId);
  const {
    data: stats,
    isPending,
    error,
  } = useMovieRatingStats(String(movieId));
  const navigate = useNavigate();

  const { isFavorited, handleToggleFavorite } = useFavoriteToggle(movie);

  if (isLoading) return <MovieDetailSkeleton />;

  if (isError || !movie) {
    return <div>영화 정보를 불러오지 못했습니다.</div>;
  }

  if (isPending) return <div>평점 정보를 불러오는 중...</div>;
  if (error) return <div>평점을 불러오지 못했습니다.</div>;

  const averageRating = stats?.averageRating ?? 0;
  const reviewCount = stats?.reviewCount ?? 0;

  // 상세 페이지에 들어올 때마다 최신 찜 목록을 전역 스토어에 동기화

  const genreNames = movie.genres
    .map(
      (movieGenre) =>
        GENRES.find((genre) => genre.id === String(movieGenre.id))?.name,
    )
    .filter((name): name is string => name !== undefined);

  const director = movie.credits.crew.find(
    (person) => person.job === "Director",
  );

  const actors = movie.credits.cast.slice(0, 5);

  return (
    <div>
      <article className=" w-full  mb-10 border-y-2 border-main/50  bg-main/10">
        <div className="max-w-325 w-full mx-auto py-12 flex md:flex justify-between px-8 lg:px-4 gap-4">
          <div className="max-w-90  md:max-w-100 lg:max-w-150 w-full">
            <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-1 break-keep">{movie.title}</h1>
            <div className="text-[10px] md:text-[12px] lg:text-sm text-gray-500 mb-10">
              {genreNames.map((genre) => (
                <span key={genre}>{genre} </span>
              ))}
              · {movie.original_title} · {movie.release_date}
            </div>
            <div
              className={
                movie.overview?.trim()
                  ? "text-gray-800 mb-9 text-[10px] md:text-sm break-keep leading-relaxed"
                  : "text-gray-400 italic mb-9 text-sm"
              }
            >
              {movie.overview && movie.overview.trim() !== ""
                ? movie.overview
                : "등록된 줄거리 정보가 없습니다."}
            </div>
            <div className="flex gap-2 mb-8">
              <Button
                className=" flex items-center gap-1"
                onClick={handleToggleFavorite}
              >
                찜하기{" "}
                <Heart
                  className={`inline-block w-4 h-4 z-30 ${isFavorited ? "fill-white text-white" : "text-white fill-black/20"}`}
                />
              </Button>
              <Button
                variant="secondary"
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

            <div className="mb-1  text-sm">
              <span className="text-gray-400">감독</span>
              <div>{director?.name}</div>
            </div>
            <div className=" text-sm">
              <span className="text-gray-400 ">출연</span>
              <div className="flex mb-10 divide-x divide-gray-300 gap-2 overflow-x-auto flex-wrap gap-y-2">
                {actors.map((actor) => (
                  <div key={actor.id} className="flex pr-2 first:pl-0">
                    <div>{actor.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 divide-x-2 divide-gray-300 ">
              <div className=" text-gray-600 font-bold pr-2">
                TMDB <span className="text-yellow-400">★</span>
                {`${movie.vote_average.toFixed(1)}`}
              </div>
              <div className=" text-gray-600 font-bold">
                리뷰{" "}
                <span className="text-yellow-400">
                  ★ {averageRating} <span className="text-gray-400">({reviewCount})</span>
                </span>
              </div>
            </div>
          </div>

          <div className="w-80 h-full aspect-2/3 rounded-[10px] overflow-hidden bg-white">
            <img
              className="rounded-[10px] w-full h-full  object-cover"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              draggable={false}
            />
          </div>
        </div>
      </article>
      <ReviewModal
        movie={movie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
