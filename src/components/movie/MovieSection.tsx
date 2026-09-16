
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MovieSectionProps {
  title: string;
  action?: ReactNode;
}

export default function MovieSection({
  title,

  action,
}: MovieSectionProps) {
  return (
    <section className="pt-8.5 pb-7.5 ">
      <div
        className={`flex justify-between items-end  ${action ? "mb-4.5" : "mb-7.5"}`}
      >
        <h2 className="text-[20px] font-bold mb-">{title}</h2>
        <Link
          to="/"
          className="flex justify-center items-center text-[13px] text-gray-700"
        >
          더보기 <ChevronRight className="text-[13px] text-gray-700" />
        </Link>
      </div>
      {action && (
        <div className="mb-6">
          {action}
        </div>
      )}
      {/* <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div> */}
    </section>
  );
}
