
import React from "react";
import { toast } from "react-hot-toast";

interface CurrencyCardProps {
  name: string;
  rate: number;
  isFavorite: boolean;
  toggleFavorite: () => void;
  isWatchlist?: boolean;
}

export default function CurrencyCard({
  name,
  rate,
  isFavorite,
  toggleFavorite,
  isWatchlist = false,
}: CurrencyCardProps) {
  const handleToggle = () => {
    toggleFavorite();
    toast.success(
      isFavorite
        ? `${name} removed from Watchlist ❌`
        : `${name} added to Watchlist ⭐`
    );
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 flex justify-between items-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:-translate-y-1">
      <div className="flex items-center gap-3">
        <img
          src={`https://flagcdn.com/24x18/${name.slice(0, 2).toLowerCase()}.png`}
          alt={`${name} flag`}
          onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Rate:{" "}
            <span className="font-semibold text-indigo-600">
              {rate.toFixed(3)}
            </span>
          </p>
        </div>
      </div>

      <button
        className={`text-3xl transition-transform duration-200 hover:scale-125 ${
          isFavorite ? "text-yellow-400 drop-shadow-md" : "text-gray-300"
        }`}
        onClick={handleToggle}
      >
        ⭐
      </button>
    </div>
  );
}
