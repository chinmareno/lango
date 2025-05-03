"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const RegisterPage = () => {
  const [passwordIsShow, setPasswordIsShow] = useState(false);
  const [confirmPasswordIsShow, setConfirmPasswordIsShow] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Name"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="text  "
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <Input
              type={passwordIsShow ? "text" : "password"}
              placeholder="Password"
              className="px-4 w-full py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setPasswordIsShow(!passwordIsShow)}
              type="button"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
            >
              {passwordIsShow ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative">
            <Input
              type={confirmPasswordIsShow ? "text" : "password"}
              placeholder="Confirm Password"
              className="px-4 py-2 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setConfirmPasswordIsShow(!confirmPasswordIsShow)}
              type="button"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
            >
              {confirmPasswordIsShow ? (
                <EyeClosed size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?
          <Link href="./login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
