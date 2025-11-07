import { create } from 'zustand';

interface Currency {
  code: 'USD' | 'EUR' | 'JOD';
  rate: number;
  favorite: boolean;
}

interface WatchlistState {
  currencies: Currency[];
  toggleFavorite: (code: Currency['code']) => void;
  getFavorites: () => Currency[];
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  currencies: [
    { code: 'USD', rate: 1, favorite: false },
    { code: 'EUR', rate: 0.92, favorite: false },
    { code: 'JOD', rate: 0.71, favorite: false },
  ],
  toggleFavorite: (code) =>
    set({
      currencies: get().currencies.map((c) =>
        c.code === code ? { ...c, favorite: !c.favorite } : c
      ),
    }),
  getFavorites: () => get().currencies.filter((c) => c.favorite),
}));
