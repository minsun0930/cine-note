//TMDB에서 가져온 데이터의 타입
export interface Movie{
  id : number,
  title : string,
  poster_path:string | null,
  release_date? : string,
  overview?: string,
  vote_average : number,
}

//장르 데이터 타입
export interface Genre {
  id: string;
  name: string;
  
}


//서버에서 받아오는 데이터
export interface TMDBResponse {
  page : number;
  results: Movie[];
  total_pages:number;
  total_results: number;
}

interface MovieGenre{
  id:number;
  name:string;
}

//반환 데이터 타입 지정. 상세 정보
export interface MovieDetail{
  id:number;
  title:string;
  overview:string;
  genres:MovieGenre[];
  original_title : string;
  release_date : string;
  credits: Credits;
  poster_path :string | null,
  vote_average:number,
}


//감독, 출연진
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}