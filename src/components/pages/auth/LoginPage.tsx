"use client";

import ErrorMessage from "@/components/common/ErrorMessage";
import { EyeToggleButton } from "@/components/common/EyeToggleButton";
import { Input } from "@/components/ui/input";
import loginSchema from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) =>
    console.log(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage
            errorMessage={errors.email?.message}
            className="ml-2 -mt-2"
          />
          <div className="relative">
            <Input
              {...register("password")}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="px-4 pr-14 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <EyeToggleButton
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              eyeIsOpen={isPasswordVisible}
              setEyeIsOpen={setIsPasswordVisible}
            />
          </div>
          <ErrorMessage
            errorMessage={errors.password?.message}
            className="ml-2 -mt-2 text-sm"
          />

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
