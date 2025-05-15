import Link from "next/link";

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Lango
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        A freelance platform that help bridging translators with their clients.
      </p>
      <div className="flex gap-4">
        <Link
          href="./auth/register"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          href="./auth/login"
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};
