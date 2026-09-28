import SearchInput from "@/components/common/SearchInput";
import MovieSection from "@/components/movie/MovieSection";
import { MAIN_GENRES } from "@/data/genres";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    if(!query.trim()) return;

    navigate(`/search?keyword=${encodeURIComponent(query)}`);
  };

  const [selectedGenreId, setSelectedGenreId] = useState("28");

  
  return (
    <div>
      <div className="max-w-325 w-full mx-auto px-4">
        <div className="@container w-full aspect-13/4 bg-main/10 border border-main/50 rounded-[10px] flex flex-col justify-center items-center mb-8">
          <h1 className="text-[2.4cqw] font-bold mb-[2.9cqw]  px-[17cqw]">
            오늘 기록하고 싶은 영화는 무엇인가요?
          </h1>
          <SearchInput variant="hero" onSearch={handleSearch} />
        </div>
      </div>
      <MovieSection
        title="Top 20 랭킹"
        type="category"
        value="top_rated"
        isTop20={true}
      />
      <MovieSection title="인기 영화" type="category" value="popular" />
      <MovieSection
        title="장르별 영화"
        type="genre"
        value={selectedGenreId}
        genres={MAIN_GENRES}
        selectedGenreId={selectedGenreId}
        onSelectGenre={setSelectedGenreId}
      />
    </div>
  );
};
export default MainPage;
