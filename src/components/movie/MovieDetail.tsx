import { Heart } from "lucide-react";
import Button from "../common/Button";
import MovieSection from "./MovieSection";

import { GENRES } from "@/data/genres";
import type { MovieDetail } from "@/types/movie";

export interface MovieDetailProps {
  movie: MovieDetail;
}

export default function MovieDetail({ movie }: MovieDetailProps) {
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
      <article className=" w-full  mb-10 bg-gray-300">
        <div className="max-w-325 w-full mx-auto py-12 flex justify-between px-4">
          <div className="max-w-150">
            <h1 className="font-bold text-3xl">{movie.title}</h1>
            <p className="text-sm text-gray-500 mb-10">
              {genreNames.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
              ·{movie.original_title} · {movie.release_date}
            </p>
            <p className="mb-9">{movie.overview}</p>
            <div className="flex gap-2 mb-8">
              <Button className=" flex items-center gap-1">
                찜하기 <Heart className="inline-block w-4 h-4" />
              </Button>
              <Button variant="secondary">리뷰 남기기</Button>
            </div>

            <p className="mb-1">
              <span className="text-gray-400">감독</span> 
              <p>{director?.name}</p>
            </p>
            <p>
              <span className="text-gray-400 ">출연</span>
              <div className="flex  gap-4 mb-6">
                {actors.map((actor) => (
                  <div key={actor.id} className="flex">
                    <p>{actor.name}</p>
                  </div>
                ))}
              </div>
            </p>

            <div>
              <div className="border border-main max-w-45 aspect-180/80 rounded-[10px]"></div>
            </div>
          </div>
          <div className="w-80 h-120 aspect-2/3 rounded-[10px] overflow-hidden">
            <img
              className="rounded-[10px] w-full h-full  object-contain"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              draggable={false}
            />
          </div>
        </div>
      </article>

      <div className="max-w-325 w-full mx-auto px-4">
        <MovieSection
          title="이 작품과 유사한 영화"
          type="category"
          value="popular"
        />
      </div>
    </div>
  );
}
