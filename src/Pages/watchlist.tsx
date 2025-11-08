import { useEffect, useState } from "react";
import CurrencyCard from "../Component/CurrencyCard";
import { useWatchlistStore } from "../Context/WatchlistContext";
import { Toaster } from "react-hot-toast";
import Loader from "../Component/Loader";

export default function Watchlist() {
  const {
    currencies,
    toggleFavorite,
    getFavorites,
    fetchCurrencies,
    isLoadingWatchList,
  } = useWatchlistStore();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "favorites">("all");
  const favorites = getFavorites();

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const filtered = (tab === "all" ? currencies : favorites).filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const isLoading = currencies.length === 0;

  if (isLoadingWatchList) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <Toaster position="top-center" />
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        💱 Currency Watchlist
      </h1>

      <div className="w-full max-w-2xl">
        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              tab === "all"
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setTab("all")}
          >
            🌍 All Currencies
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              tab === "favorites"
                ? "bg-yellow-400 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setTab("favorites")}
          >
            ⭐ Favorites
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search currency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400"
        />

        {/* Content */}
        {isLoading ? (
          <p className="text-gray-500 text-center italic">
            Loading currencies...
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-red-500 text-center italic">
            ❌ No currencies found.
          </p>
        ) : (
          <ul className="space-y-4">
            {filtered.map((currency) => (
              <CurrencyCard
                key={currency.code}
                name={currency.code}
                rate={currency.rate}
                isFavorite={currency.favorite}
                toggleFavorite={() => toggleFavorite(currency.code)}
                isWatchlist={tab === "favorites"}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
