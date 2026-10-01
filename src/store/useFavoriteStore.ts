import { create } from "zustand";

interface FavoriteState {
  favorites: number[];
  setFavorites: (favorites: number[]) => void;
  addFavorite: (movieId: number) => void;
  removeFavorite: (movieId: number) => void;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favorites: [],
  setFavorites: (favorites) =>
    set({ favorites: favorites.map((id) => Number(id)) }),

  addFavorite: (movieId) =>
    set((state) => ({ favorites: [...state.favorites, Number(movieId)] })),
  
  removeFavorite: (movieId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== Number(movieId)),
    })),
}));
