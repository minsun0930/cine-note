
import SearchInput from "@/components/common/SearchInput";
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
      <MovieSection title="Top 20 랭킹" 
        // action={    
        //  <div className="*:mr-1">
        //   <Button variant="chip">로맨스</Button>
        //   <Button variant="chip">스릴러</Button>
        //   <Button variant="chip">SF</Button>
        //   <Button variant="chip">코미디</Button>
        //   <Button variant="chip">액션</Button>
        //   <Button variant="chip">추리</Button>
        //   <Button variant="chip">애니메이션</Button>
        //  </div>} 
        />
    </div>
  );
};
export default MainPage;
