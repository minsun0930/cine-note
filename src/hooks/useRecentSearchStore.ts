import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentSearchState {
  recentSearches: string[];
  addSearch: (keyword: string) => void;
  removeSearch: (keyword: string) => void;
  clearAll: () => void;
}

export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set) => ({
      recentSearches: [],
      addSearch: (keyword) =>
        set((state) => ({
          recentSearches: [
            keyword,
            ...state.recentSearches.filter((item) => item !== keyword),
          ].slice(0, 10),
        })),
      removeSearch: (keyword) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter(
            (item) => item !== keyword,
          ),
        })),
      clearAll: () => set({ recentSearches: [] }),
    }),
    {
      name: "recent_search_storage",
    },
  ),
);
