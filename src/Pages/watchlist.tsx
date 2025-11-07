

import React from 'react';
import CurrencyCard from '../component/CurrencyCard';
import { useWatchlistStore } from '../Context/WatchlistContext';

export default function Watchlist() {
  const { currencies, toggleFavorite, getFavorites } = useWatchlistStore();
  const favorites = getFavorites();

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gradient-to-br from-blue-50 via-indigo-100 to-indigo-200
 flex flex-col items-center p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-wide drop-shadow-sm">
        💱 Currency Watchlist
      </h1>

      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <span className="text-indigo-500">🌍</span> Available Currencies
        </h2>

        <ul className="space-y-4">
          {currencies.map((currency) => (
            <CurrencyCard
              key={currency.code}
              name={currency.code}
              rate={currency.rate}
              isFavorite={currency.favorite}
              toggleFavorite={() => toggleFavorite(currency.code)}
            />
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700 flex items-center gap-2">
          <span className="text-yellow-500">⭐</span> Your Favorites
        </h2>

        {favorites.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            No favorite currencies selected yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {favorites.map((f) => (
              <CurrencyCard
                key={f.code}
                name={f.code}
                rate={f.rate}
                isFavorite={true}
                toggleFavorite={() => toggleFavorite(f.code)}
                isWatchlist={true}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

