import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Currency {
  code: string;
  rate: number;
  favorite: boolean;
}

interface WatchlistState {
  currencies: Currency[];
  toggleFavorite: (code: string) => void;
  fetchCurrencies: () => Promise<void>;
  isLoadingWatchList: boolean;
  getFavorites: () => Currency[];
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      currencies: [],
      isLoadingWatchList: true,

      toggleFavorite: (code: string) => {
        const updated = get().currencies.map((c: Currency) =>
          c.code === code ? { ...c, favorite: !c.favorite } : c
        );
        set({ currencies: updated });
      },

      getFavorites: () => get().currencies.filter((c) => c.favorite),

      fetchCurrencies: async () => {
        try {
          set({ isLoadingWatchList: true });

          const res = await fetch("https://open.er-api.com/v6/latest/USD");
          const data = await res.json();

          if (data && data.rates) {
            const fetched: Currency[] = Object.entries(data.rates).map(
              ([code, rate]) => ({
                code,
                rate: Number(rate),
                favorite:
                  get().currencies.find((c) => c.code === code)?.favorite ||
                  false,
              })
            );
            set({ currencies: fetched });
          }
        } catch (err) {
          console.error("❌ Failed to fetch currencies:", err);
        } finally {
          set({ isLoadingWatchList: false });
        }
      },
    }),
    {
      name: "watchlist-storage",
    }
  )
);
