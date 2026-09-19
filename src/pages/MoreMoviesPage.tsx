import MoreMoviesView from "@/components/movie/MoreMoviesView";
import { GENRES } from "@/data/genres";
import { useSearchParams } from "react-router-dom";

export default function MoreMoviePage() {
  const [searchParams] = useSearchParams();

  const selectedGenreId = searchParams.get("value");

  return (
    <div>
      <MoreMoviesView
        genres={GENRES}
        selectedGenreId={selectedGenreId ?? undefined}
      />
    </div>
  );
}