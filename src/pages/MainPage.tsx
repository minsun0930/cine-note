import SearchInput from "@/components/common/SearchInput";


const MainPage = () => {
  const handleSearch = (query: string) => {
    console.log("검색어:", query);
  };


  return (
    <div className="@container w-full aspect-13/4 bg-white border border-main rounded-[10px] flex flex-col justify-center items-center">
      <h1 className="text-[2.4cqw] font-bold mb-[2.9cqw]  px-[17cqw]">
        오늘 기록하고 싶은 영화는 무엇인가요?
      </h1>
      <SearchInput onSearch={handleSearch}/>
    </div>
  );
};
export default MainPage;
