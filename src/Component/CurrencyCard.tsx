
import React from 'react';

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
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 flex justify-between items-center shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:-translate-y-1">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-500 mt-1">
          Exchange Rate: <span className="font-semibold text-indigo-600">{rate}</span>
        </p>
      </div>

      <button
        className={`text-3xl transition-transform duration-200 hover:scale-125 ${
          isFavorite ? 'text-yellow-400' : 'text-gray-300'
        }`}
        onClick={toggleFavorite}
      >
        {isWatchlist ? '❌' : '⭐'}
      </button>
    </div>
  );
}
