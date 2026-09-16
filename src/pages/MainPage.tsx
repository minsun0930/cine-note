import SearchInput from "@/components/common/SearchInput";
import MovieCard from "@/components/movie/MovieCard";
import type { Movie } from "@/types/movie";

const dummyMovie: Movie = {
  id: 1,
  title: "인셉션",
  poster_path: "https://search.pstatic.net/common?type=f208_312&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20260710_243%2F1783670981741HgbjS_JPEG%2Fmovie_image.jpg", 
  vote_average: 8.8,
};



const MainPage = () => {
  const handleSearch = (query: string) => {
    console.log("검색어:", query);
  };

  return (
    <div>
      <div className="@container w-full aspect-13/4 bg-white border border-main rounded-[10px] flex flex-col justify-center items-center">
        <h1 className="text-[2.4cqw] font-bold mb-[2.9cqw]  px-[17cqw]">
          오늘 기록하고 싶은 영화는 무엇인가요?
        </h1>
        <SearchInput onSearch={handleSearch} />
      </div>
      <MovieCard movie={dummyMovie}/>
    </div>
  );
};
export default MainPage;
