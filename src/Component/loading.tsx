export default function LoadingSpinner() {
  return (
   <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="relative">
        {/* Outer fast spinner */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        {/* Inner slow spinner */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-indigo-400 animate-spin-slow" />
      </div>

      <p className="mt-6 text-gray-800 text-lg font-semibold tracking-wide">
        Loading, please wait...
      </p>
    </div>
  );
}
