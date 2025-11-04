import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600 drop-shadow-md select-none">404</h1>

        <h2 className="mt-6 text-3xl font-semibold text-gray-800 dark:text-gray-200">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          The page you're looking for may have been removed or the URL might be incorrect.
        </p>

        <div className="mt-8">
          <Link
            to="/dashboard"
            className="inline-block px-8 py-3 text-white! font-medium bg-blue-600 rounded-lg shadow hover:bg-blue-700 active:scale-95 transition-all"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Decoration */}
        <div className="mt-12 flex justify-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full opacity-10 blur-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
