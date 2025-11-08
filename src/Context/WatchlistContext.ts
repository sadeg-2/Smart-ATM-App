

import { create } from "zustand";

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

  toggleFavorite: (code) => {
    const updated = get().currencies.map((c) =>
      c.code === code ? { ...c, favorite: !c.favorite } : c
    );
    set({ currencies: updated });

    // 🧠 حفظ الحالة في localStorage
    localStorage.setItem("currencies", JSON.stringify(updated));
  },

  getFavorites: () => get().currencies.filter((c) => c.favorite),

  fetchCurrencies: async () => {
    try {
      // 🔹 تحقق أولاً إذا في بيانات محفوظة مسبقاً
      const saved = localStorage.getItem("currencies");
      if (saved) {
        set({ currencies: JSON.parse(saved) });
        return;
      }

      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await res.json();

      if (data && data.rates) {
        const fetched = Object.entries(data.rates).map(([code, rate]) => ({
          code,
          rate: Number(rate),
          favorite: false,
        }));
        set({ currencies: fetched });

        // 💾 حفظ أول مرة في localStorage
        localStorage.setItem("currencies", JSON.stringify(fetched));
      }
    } catch (err) {
      console.error("❌ Failed to fetch currencies:", err);
    }
  },
}));
