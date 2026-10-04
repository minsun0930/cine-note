export interface Review {
  id: string;
  user_id?: string;
  movie_id: string;
  movie_title: string;
  nickname: string;
  rating: number;
  content: string;
  created_at: string;
  poster_path?: string  | null;
}  