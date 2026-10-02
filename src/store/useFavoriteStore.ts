import type { Movie } from "@/types/movie";
import { create } from "zustand";




interface FavoriteState {
  favorites: Movie[];
  setFavorites: (favorites: Movie[]) => void;
  addFavorite: (movieId: Movie) => void;
  removeFavorite: (movieId: number) => void;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favorites: [],
 setFavorites: (movies) => set({ favorites: movies }),
  addFavorite: (movie) => 
    set((state) => ({ favorites: [...state.favorites, movie] })),
  removeFavorite: (movieId) => 
    set((state) => ({ 
      favorites: state.favorites.filter((m) => m.id !== movieId) 
    })),
}));
