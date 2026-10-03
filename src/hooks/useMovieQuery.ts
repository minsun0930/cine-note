import { fetchFavoriteMovies, fetchReivewsByMovieId, fetchReivewsByUserId } from "@/api/supabase";
import { fetchMovieDetail, fetchMovies, fetchSearchMovies, fetchSimilarMovies} from "@/api/tmdb";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/supabase/supabaseClient";
import type { Movie, MovieBase, MovieDetail, TMDBResponse } from "@/types/movie";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


//영화 리스트 가져오기
export const useMovies = (
  type: "category" | "genre",
  value: string
) => {
  return useQuery<TMDBResponse, Error>({
    queryKey: ["movies", type, value],
    queryFn: () => fetchMovies(type, value),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });
};



//영화 리스트 추가로 가져오기 (더보기 눌렀을 때)
export const useInfiniteMovies = (
  type: "category" | "genre",
  value: string,
) => {
  const query = useInfiniteQuery({
    queryKey: ["movies-infinite", type, value],

    queryFn: ({ pageParam }) =>  fetchMovies(type, value, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => 
      lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined,

    staleTime: 1000 * 60 * 5,
  });

  // 지금까지 불러온 모든 페이지의 영화를 하나의 배열로 합침
  const movies = query.data?.pages.flatMap((page) => page.results) ?? [];

  // 전체 영화 개수
  const totalResults = query.data?.pages[0]?.total_results ?? 0;

  return {
    ...query,
    movies,
    totalResults,
  };
};


//영화 상세 정보 가져오기
export const useMovieDetail=  (id?:string )=>{
  return useQuery<MovieDetail>({
    queryKey: ["movie",id],
    queryFn :() => fetchMovieDetail(id!),
    enabled : !!id,
    staleTime : 1000 * 60 * 5,
  })
}


//유사한 영화 데이터 가져오기
export const useSimilarMovies = (id?:string) =>{
  return useQuery({
    queryKey: ["movieSimilar", id],
    queryFn:()=>fetchSimilarMovies(id!),
    enabled: !!id,
    staleTime:1000*60*5,
  })
}

//검색한 영화 리스트 추가로 가져오기
export const useSearchMovies = (
  keyword :string
) => {
  const query = useInfiniteQuery({
    queryKey: ["movies-infinite", keyword],

    queryFn: ({ pageParam }) =>  fetchSearchMovies(keyword, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => 
      lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined,

    staleTime: 1000 * 60 * 5,
  });

  // 지금까지 불러온 모든 페이지의 영화를 하나의 배열로 합침
  const movies = query.data?.pages.flatMap((page) => page.results) ?? [];

  // 전체 영화 개수
  const totalResults = query.data?.pages[0]?.total_results ?? 0;

  return {
    ...query,
    movies,
    totalResults,
  };
};



//---------------------supabase 관련 훅------------------------


//찜한 영화 가져오기(supabase)
export const useFavoriteMovies = (userId? : string) =>{
  return useQuery<Movie[]>({
    queryKey: ["favorites",userId],
    queryFn : () => fetchFavoriteMovies(userId!),
    enabled : !!userId,
    staleTime : 1000*60*5,
  })
}

//찜 토글 및 하트 상태 관리 훅
export const useFavoriteToggle = (movie:MovieBase | undefined) =>{
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const user = useAuthStore((state)=> state.user);
  const userId = user?.id;

  const {data:favoriteMovies = []} = useFavoriteMovies(userId);
    const isFavorited = movie
    ? favoriteMovies.some((m) => m.id === movie.id)
    : false;

    const  handleToggleFavorite = async (e:React.MouseEvent | React.PointerEvent) =>{
      e.stopPropagation();
      e.preventDefault();
      
      if(!movie) return

      const {data:userData} = await supabase.auth.getUser();
      if(!userData || userData.user === null){
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
        return;
      }

      const userId = userData.user.id;

      //찜 되어있음.
      if(isFavorited){
        const {error} = await supabase
          .from("favorites")
          .delete()
          .eq("user_id",userId)
          .eq("movie_id", movie.id);

        if(error) console.error("찜 취소 에러 ", error.message);
      }//찜 안되어있는 경우
        else {
        const newFavoriteData = {
          user_id: userId,
          movie_id: movie.id,
          movie_title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average ?? 0,
          release_date: movie.release_date,
          overview: movie.overview,
        };

        const { error } = await supabase
          .from("favorites")
          .insert(newFavoriteData);

        if (error) console.error("찜 추가 에러:", error.message);
      }
      // 찜 목록 쿼리 무효화 (즉시 리렌더링)
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    };
  return { isFavorited, handleToggleFavorite };
}



//특정 영화 리뷰 목록 가져오기

//특정 유저가 작정한 리뷰 목록 가져오기
export const useMovieReviews = (movieId:string) =>{
  return useQuery({
    queryKey : ["reviews", movieId],
    queryFn : () => fetchReivewsByMovieId(movieId),
    enabled : !!movieId,
  });
};


export const useUserReviews = (userId : string | undefined) =>{
  return useQuery({
    queryKey: ["myReviews", userId],
    queryFn : () => fetchReivewsByUserId(userId!),
    enabled: !!userId,
  })
}