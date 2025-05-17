import Link from "next/link";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-snug">
        Welcome to Lango
      </h1>

      <p className="text-gray-600 text-base md:text-lg max-w-xl mb-8">
        A freelance platform that helps bridge translators with their clients.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link
          href="/auth/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-full text-sm md:text-base hover:bg-blue-700 transition w-full sm:w-auto text-center"
        >
          🚀 Get Started
        </Link>

        <Link
          href="/auth/login"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full text-sm md:text-base hover:bg-gray-100 transition w-full sm:w-auto text-center"
        >
          🔑 Login
        </Link>
      </div>
    </div>
  );
};
