//TMDB에서 가져온 데이터의 타입
export interface Movie{
  id : number,
  title : string,
  poster_path:string | null,
  release_date? : string,
  overview?: string,
  vote_average : number
}

//장르 데이터 타입
interface Genre {
  name: string;
  id: string;
}

//화면 출력할때 쓰는 데이터 타입
export interface MovieSectionProps {
  title: string;
  type: "category" | "genre";
  value: string;
  isTop20?: boolean;
  genres?: Genre[];
  selectedGenreId?: string;
  onSelectGenre?: (id: string) => void; // 장르 변경 함수
} 

//서버에서 받아오는 데이터
export interface TMDBResponse {
  page : number;
  results: Movie[];
  total_pages:number;
  total_results : number;
}