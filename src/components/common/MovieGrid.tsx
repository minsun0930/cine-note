import MovieCard from "@/components/movie/MovieCard";
import MovieCardSkeleton from "@/components/movie/MovieCardSkeleton";
import type { Movie } from "@/types/movie";

interface MovieGridProps {
  movies: Movie[];
  totalResults?: number;
  isLoading: boolean;
  isFetching?: boolean;
}


export default function MovieGridSection({totalResults , movies, isLoading, isFetching} :MovieGridProps) {
  return (
    <div className="py-8">
      {totalResults !== undefined && (
        <span className="text-sm text-gray-500 font-medium block mb-4">
          작품 {totalResults}개
        </span>
      )}
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4">

      {movies?.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} isGrid={true} />
            </div>
      ))}

      {isLoading && 
        Array.from({ length: 20 }).map((_, index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} isGrid={true} />
      ))}

      {
        isFetching && !isLoading &&
          Array.from({length:7}).map((_,index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} isGrid={true} />
      ))}
      
    </div>   
    </div>
  );
}
