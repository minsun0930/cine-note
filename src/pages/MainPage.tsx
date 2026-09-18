import SearchInput from "@/components/common/SearchInput";
import GenreMovieSection from "@/components/movie/GenreMovieSection";
import MovieSection from "@/components/movie/MovieSection";



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
      <MovieSection title="Top 20 랭킹" category="top_rated" isTop20={true}/>
      <MovieSection title="인기 영화" category="popular"/>
      <GenreMovieSection title="장르별 영화" />
    </div>
  );
};
export default MainPage;
