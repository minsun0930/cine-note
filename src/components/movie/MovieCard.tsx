import type { Movie } from "@/types/movie";


interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article
      className="relative flex shrink-0 w-45 flex-col border bg-white border-gray-300 rounded-xl overflow-hidden "
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
          {`${(movie.vote_average).toFixed(1)}`}
        </p>
      </div>
    </article>
  );
}
