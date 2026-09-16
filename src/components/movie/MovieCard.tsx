import type { Movie } from "@/types/movie";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/movies/`}
      className="flex flex-col border max-w-45 bg-white border-gray-300 rounded-xl overflow-hidden "
    >
      <img className="w-full aspect-2/3" src={`${movie.poster_path}`} alt="" />
      <div className="pl-4 pt-3 pb-4">
        <h3 className="text-[15px] font-semibold mb-1">{`${movie.title}`}</h3>
        <p className="text-[10px] text-gray-600">
          TMDB <span className="text-yellow-400">★</span>{" "}
          {`${movie.vote_average}`}
        </p>
      </div>
    </Link>
  );
}
