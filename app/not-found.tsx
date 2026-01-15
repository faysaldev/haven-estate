import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF]">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-[#235C47]">404</h1>
          <h2 className="text-3xl font-semibold text-[#235C47] mt-4">
            Page Not Found
          </h2>
        </div>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn{`'`}t find the page you{`'`}re looking for. It might
          have been removed, had its name changed, or is temporarily
          unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-[#FFFFFF] bg-[#235C47] hover:bg-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235C47]"
          >
            Go Home
          </Link>
          <Link
            href="/auth/signin"
            className="px-6 py-3 border border-[#235C47] rounded-md shadow-sm text-base font-medium text-[#235C47] bg-[#F9F7F6] hover:bg-[#e8e4e1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#235C47]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
