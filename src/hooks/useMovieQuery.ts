import {
  fetchFavoriteMovies,
  fetchReviewsByMovieId,
  fetchReviewsByUserId,
} from "@/api/supabase";
import {
  fetchMovieDetail,
  fetchMovies,
  fetchSearchMovies,
  fetchSimilarMovies,
} from "@/api/tmdb";
import { useAuthStore } from "@/hooks/auth/useAuthStore";
import { supabase } from "@/supabase/supabaseClient";
import type {
  Movie,
  MovieBase,
  MovieDetail,
  TMDBResponse,
} from "@/types/movie";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//영화 리스트 가져오기
export const useMovies = (type: "category" | "genre", value: string) => {
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

    queryFn: ({ pageParam }) => fetchMovies(type, value, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,

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
export const useMovieDetail = (id?: string) => {
  return useQuery<MovieDetail>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetail(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

//유사한 영화 데이터 가져오기
export const useSimilarMovies = (id?: string) => {
  return useQuery({
    queryKey: ["movieSimilar", id],
    queryFn: () => fetchSimilarMovies(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

//검색한 영화 리스트 추가로 가져오기
export const useSearchMovies = (keyword: string) => {
  const query = useInfiniteQuery({
    queryKey: ["movies-infinite", keyword],

    queryFn: ({ pageParam }) => fetchSearchMovies(keyword, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,

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
export const useFavoriteMovies = (userId?: string) => {
  return useQuery<Movie[]>({
    queryKey: ["favorites", userId],
    queryFn: () => {
      if (!userId) return [];
      return fetchFavoriteMovies(userId!);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

//찜 토글 및 하트 상태 관리 훅
export const useFavoriteToggle = (movie: MovieBase | undefined) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const { data: favoriteMovies = [] } = useFavoriteMovies(userId);
  const isFavorited = movie
    ? favoriteMovies.some((m) => m.id === movie.id)
    : false;

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      if (!movie) return;
      if (!userId) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
        return;
      }

      if (isFavorited) {
        //찜 취소 (Delete)
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("movie_id", movie.id);
        if (error) throw error;
      } else {
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

        if (error) throw error;
      }
    },
    onSuccess : () =>{
      // 찜 목록 쿼리 무효화 (즉시 리렌더링)
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] })
    },
    onError : (error) =>{
      console.error("찜 토글 에러 :" , error.message);
      alert("요청 처리 중 오류가 발생했습니다.");
    }
  });

  const handleToggleFavorite = async (
    e: React.MouseEvent | React.PointerEvent,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (!movie) return;

   
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    favoriteMutation.mutate();

  };
  return { isFavorited, handleToggleFavorite, isPending: favoriteMutation.isPending };
};

//특정 영화 리뷰 목록 가져오기
export const useMovieReviews = (movieId: string) => {
  return useQuery({
    queryKey: ["reviews", movieId],
    queryFn: () => fetchReviewsByMovieId(movieId),
    enabled: !!movieId,
  });
};


//특정 유저가 작정한 리뷰 목록 가져오기
export const useUserReviews = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["reviews", userId],
    queryFn: () => fetchReviewsByUserId(userId!),
    enabled: !!userId,
  });
};


//리뷰 등록 훅(Mutation)
export const useAddReview = (movieId: string) =>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : async (newReviewData:{
        movie_title: string,
        poster_path: string | null,
        user_id: string,
        nickname: string,
        rating: number,
        content: string,
    }) =>{
      const {error} = await supabase.from("reviews").insert({
        movie_id: movieId,
        ...newReviewData,
      });
      if(error) throw error;
    },
    onSuccess : () =>{
      alert("리뷰가 성공적으로 등록되었습니다!");
      queryClient.invalidateQueries({queryKey: ["reviews"]});
    },
    onError : (error) =>{
      console.error("리뷰 등록 실패 : ", error.message);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    },
  });
};


//리뷰 수정 훅(Mutation)
export const useUpdateReview = () =>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : async ({reviewId, newContent, newRating} :{ reviewId: string; newContent: string; newRating: number }) =>{
      const {error} = await supabase
        .from("reviews")
        .update({content:newContent, rating : newRating})
        .eq("id", reviewId);
      if(error) throw error;
    },
    onSuccess : () =>{
      alert("리뷰가 수정되었습니다.");
      queryClient.invalidateQueries({queryKey: ["reviews"]});
    },
    onError : (error) =>{
      console.error("수정 실패:",error.message);
      alert("리뷰 수정 중 오류가 발생했습니다.");
    },
  });

}


//리뷰 삭제 훅
export const useDeleteReview = () =>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : async (reviewId: string) =>{
      const {error} = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);
      if(error) throw error;
    },
    onSuccess : () =>{
      alert("리뷰가 삭제되었습니다.");
      queryClient.invalidateQueries({queryKey : ["reviews"]});
    },
    onError : (error) => {
      console.error("삭제 실패 : ", error.message);
      alert("리뷰 삭제 중 오류가 발생했습니다.")
    }

  })

}
