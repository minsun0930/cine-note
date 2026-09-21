import { Heart } from "lucide-react";
import Button from "../common/Button";


import { GENRES } from "@/data/genres";
import type { MovieDetail } from "@/types/movie";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "@/hooks/useMovieDetail";
import MovieDetailSkeleton from "../skeleton/MovieDetailSkeleton";



export default function MovieDetail() {

  
  const {movieId} = useParams();
  const {data: movie,isLoading,isError} = useMovieDetail(movieId);

  if(isLoading) return <MovieDetailSkeleton/>

  if (isError || !movie) {
    return <div>영화 정보를 불러오지 못했습니다.</div>;
  }

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

      <article className=" w-full  mb-10 border-t border-b border-main">
        <div className="max-w-325 w-full mx-auto py-12 flex justify-between px-4">
          <div className="max-w-150">
            <h1 className="font-bold text-3xl mb-1">{movie.title}</h1>
            <p className="text-sm text-gray-500 mb-10">
              {genreNames.map((genre) => (
                <span key={genre}>{genre} </span>
                
              ))}
               · {movie.original_title} · {movie.release_date}
            </p>
            <p className={movie.overview?.trim() ? "text-gray-800 mb-9" : "text-gray-400 italic mb-9"}>
              {movie.overview && movie.overview.trim() !== "" 
                ? movie.overview 
                : "등록된 줄거리 정보가 없습니다."}
            </p>
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
              <div className="flex mb-10 divide-x divide-gray-300 overflow-x-auto flex-wrap">
                {actors.map((actor) => (
                  <div key={actor.id} className="flex px-2 first:pl-0">
                    <p>{actor.name}</p>
                  </div>
                ))}
              </div>
            </p>
            <p className=" text-gray-600 font-bold" >
                TMDB <span className="text-yellow-400">★</span>{" "}
                {`${movie.vote_average.toFixed(1)}`}
            </p>
   
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

    </div>
  );
}
