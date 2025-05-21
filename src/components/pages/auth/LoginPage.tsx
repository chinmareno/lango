"use client";

import loginAction from "@/actions/auth/loginAction";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { EyeToggleButton } from "@/components/ui/EyeToggleButton";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await loginAction(data);
      if (!res?.success) {
        return toast.error(res?.message, { richColors: true, duration: 3000 });
      }
      if (res.currentRole === "TRANSLATOR") {
        await signIn("credentials", {
          email: res.email,
          redirect: true,
          redirectTo: "/translator/dashboard",
        });
      }
      if (res.currentRole === "CLIENT") {
        await signIn("credentials", {
          email: res.email,
          redirect: true,
          redirectTo: "/client/dashboard",
        });
      }
    } catch (error) {
      const { message } = error as { message: string };
      if (message === "Invalid email or password") {
        toast.error("Invalid email or password", {
          richColors: true,
          duration: 3000,
        });
      } else {
        toast.error("Something went wrong", {
          richColors: true,
          duration: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-center text-gray-900">
          Login to Your Account
        </h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-6"
        >
          <Input
            {...register("email")}
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            aria-label="Email"
            type="email"
            placeholder="Email"
            className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
          />
          <ErrorMessage
            errorMessage={errors.email?.message}
            className="ml-2 -mt-4 text-sm text-red-600"
          />
          <div className="relative">
            <Input
              {...register("password")}
              disabled={isSubmitting}
              aria-label="Password"
              aria-disabled={isSubmitting}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="px-5 pr-14 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg w-full"
            />
            <EyeToggleButton
              ariaLabel={
                isPasswordVisible
                  ? "Click to hide password"
                  : "Click to show password"
              }
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${
                isSubmitting ? "text-gray-300" : "text-gray-500"
              }`}
              eyeIsOpen={isPasswordVisible}
              setEyeIsOpen={setIsPasswordVisible}
              buttonProps={{
                disabled: isSubmitting,
                "aria-disabled": isSubmitting,
              }}
            />
          </div>
          <ErrorMessage
            errorMessage={errors.password?.message}
            className="ml-2 -mt-4 text-sm text-red-600"
          />
          <button
            aria-label="Submit to login"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            type="submit"
            className={`text-white py-3 rounded-xl transition text-lg font-semibold ${
              isSubmitting
                ? "bg-blue-400"
                : "bg-blue-600 cursor-pointer hover:bg-blue-700"
            }`}
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-base md:text-lg text-gray-700">
          Don't have an account?
          <Link
            aria-label="Go to register page"
            href="./register"
            aria-disabled={isSubmitting}
            className={`text-blue-600 ${
              isSubmitting
                ? "pointer-events-none"
                : "hover:underline hover:text-blue-700 transition"
            }`}
            onClick={(e) => {
              if (isSubmitting) e.preventDefault();
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
