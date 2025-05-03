"use client";

import { EyeToogleButton } from "@/components/common/EyeToogleButton";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [passwordIsShow, setPasswordIsShow] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h1>
        <form className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <Input
              type={passwordIsShow ? "text" : "password"}
              placeholder="Password"
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></Input>
            <EyeToogleButton
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              eyeIsOpen={passwordIsShow}
              setEyeIsOpen={setPasswordIsShow}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <Link href="" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="text-sm text-center">
            Don't have an account?
            <Link
              href="./register"
              className="text-blue-600 hover:underline ml-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
