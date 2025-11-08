
import { create } from 'zustand';

interface Currency {
  code: string;
  rate: number;
  favorite: boolean;
}

interface WatchlistState {
  currencies: Currency[];
  toggleFavorite: (code: string) => void;
  getFavorites: () => Currency[];
  fetchCurrencies: () => Promise<void>;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  currencies: [],
  toggleFavorite: (code) =>
    set({
      currencies: get().currencies.map((c) =>
        c.code === code ? { ...c, favorite: !c.favorite } : c
      ),
    }),
  getFavorites: () => get().currencies.filter((c) => c.favorite),
  fetchCurrencies: async () => {
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await res.json();

      if (data && data.rates) {
        const fetched = Object.entries(data.rates).map(([code, rate]) => ({
          code,
          rate: Number(rate),
          favorite: false,
        }));
        set({ currencies: fetched });
      }
    } catch (err) {
      console.error("❌ Failed to fetch currencies:", err);
    }
  },
}));
