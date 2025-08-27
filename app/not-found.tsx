import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Page Not Found
        </h2>
        <p className="mb-6 text-gray-600">Could not find the requested page.</p>
        <Link
          href="/"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
