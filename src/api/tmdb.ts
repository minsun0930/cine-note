import type { MovieDetail, TMDBResponse } from "@/types/movie";
import api from "./axios";

export const fetchMovies = async(
  type: "category" | "genre",
  value: string,
  page : number =1,
): Promise<TMDBResponse> => {
   if (type === "category") {
    const {data} = await api.get<TMDBResponse>(`/movie/${value}`,{
      params: {
        page,
      },
   });

  return data;
}

 const { data } = await api.get<TMDBResponse>("/discover/movie", {
    params: {
      page,
      with_genres: value,
    },
  });

  return data;
};



export const fetchMovieDetail = async(id:string): Promise<MovieDetail> =>{
  const {data} = await api.get(`{movie/${id}}`,{
    params:{
      append_to_response: "credits",
    },
  });
  return data;
}


export const fetchSimilarMovies = async(movieId:string) :Promise<TMDBResponse>=>{
  const {data} = await api.get<TMDBResponse>(`movie/${movieId}/similar`,);
  return data;
}


//검색 결과 데이터 가져오기
export const fetchSearchMovies = async(query:string, page=1): Promise<TMDBResponse>  =>{
   const {data} = await api.get<TMDBResponse>("/search/movie",{
    params:{
      query,
      page,
    },
   });

  return data;
}