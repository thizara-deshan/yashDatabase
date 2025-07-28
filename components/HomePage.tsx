import Link from "next/link";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <>
      <div className="flex  items-center justify-center">
        <div className="flex space-x-4">
          <Button
            asChild
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 bg-transparent"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
