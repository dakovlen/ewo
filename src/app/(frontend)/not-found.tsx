// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-teal-700 mb-4">404 – Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, we couldn’t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-teal-700 text-white rounded-xl hover:bg-teal-800 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
