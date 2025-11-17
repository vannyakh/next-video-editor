"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-gray-600 dark:text-gray-400">
        {error.message || "An unexpected error occurred"}
      </p>
      <div className="flex gap-2">
        <Button onClick={reset} variant="outline">Try again</Button>
        <Button variant="outline">
          Go Home
        </Button>
      </div>
    </div>
  );
}