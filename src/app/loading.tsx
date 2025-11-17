export default function Loading() {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col gap-4 items-center">
          <div className="w-8 h-8 rounded-full border-4 border-gray-300 animate-spin border-t-gray-900" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }