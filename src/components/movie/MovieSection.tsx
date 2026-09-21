import { useMovies } from "@/hooks/useMovieQuery";
import Button from "../common/Button";
import type { Genre } from "@/types/movie";
import MovieSlider from "../common/MovieSlider";

//화면 출력할때 쓰는 데이터 타입
export interface MovieSectionProps {
  title: string;
  type: "category" | "genre";
  value: string;
  isTop20?:boolean;
  genres?: Genre[];
  selectedGenreId?: string;
  onSelectGenre?: (id: string) => void; // 장르 변경 함수
}

export default function MovieSection({
  title,
  type,
  value,
  genres,
  selectedGenreId,
  onSelectGenre,
  isTop20 = false,
}: MovieSectionProps) {
  const { data, isLoading, isError, error } = useMovies(type, value);
  const movies = data?.results ?? [];

  if (isError) {
    return <div>에러 발생 : {error.message}</div>;
  }

  return (
      <MovieSlider title={title} isLoading={isLoading} movies={movies} isTop20={isTop20} type={type} value={value} >
        {genres && onSelectGenre && (
          <div className="w- mb-4.5 flex overflow-x-auto scrollbar-none *:mr-1.5">
            {genres.map((genre) => (
              <Button
                key={genre.id}
                variant="chip"
                onClick={() => onSelectGenre(genre.id)}
                className={
                  selectedGenreId === genre.id
                    ? "bg-main text-white border-main hover:bg-main"
                    : ""
                }
              >
                {genre.name}
              </Button>
            ))}
          </div>
        )}
      </MovieSlider>
  );
}
