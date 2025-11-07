export default function LoadingSpinner() {
  return (
    <>
     <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="relative">
        {/* Outer spinner */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        {/* Inner slow spinner */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-indigo-400 animate-spin-slow" />
      </div>

      <p className="mt-6 text-gray-700 text-lg font-semibold tracking-wide">
        Loading, please wait...
      </p>
    </div>
    </>
  );
}
