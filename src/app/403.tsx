import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold">403</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        You don&apos;t have permission to access this resource
      </p>
      <div className="flex gap-2">
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}