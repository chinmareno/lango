"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { EyeToggleButton } from "@/components/ui/EyeToggleButton";
import registerAction from "@/actions/auth/registerAction";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { registerSchema } from "@/lib/schemas/registerSchema";

export const RegisterPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: z.infer<typeof registerSchema>) => {
    const res = await registerAction(data);
    if (!res?.success) {
      return toast.error(res?.message);
    }
    await signIn("credentials", {
      email: res.email,
      redirect: true,
      redirectTo: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-8 text-center text-gray-900">
          Create Account
        </h1>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-8"
        >
          <Input
            {...register("name")}
            aria-label="Name"
            type="text"
            placeholder="Name"
            className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md text-lg"
          />
          <ErrorMessage
            className="ml-2 -mt-5 text-base text-red-600"
            errorMessage={errors.name?.message}
          />

          <Input
            {...register("email")}
            aria-label="Email"
            type="email"
            placeholder="Email"
            className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md text-lg"
          />
          <ErrorMessage
            className="ml-2 -mt-5 text-base text-red-600"
            errorMessage={errors.email?.message}
          />

          <div className="relative">
            <Input
              {...register("password")}
              aria-label="Password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="px-5 pr-14 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md text-lg"
            />
            <EyeToggleButton
              ariaLabel={
                isPasswordVisible
                  ? "Click to hide password"
                  : "Click to show password"
              }
              eyeIsOpen={isPasswordVisible}
              setEyeIsOpen={setIsPasswordVisible}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            />
          </div>
          <ErrorMessage
            className="ml-2 -mt-5 text-base text-red-600"
            errorMessage={errors.password?.message}
          />

          <div className="relative">
            <Input
              {...register("confirmPassword")}
              aria-label="Confirm Password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="px-5 pr-14 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md text-lg"
            />
            <EyeToggleButton
              ariaLabel={
                isConfirmPasswordVisible
                  ? "Click to hide confirm password"
                  : "Click to show confirm password"
              }
              eyeIsOpen={isConfirmPasswordVisible}
              setEyeIsOpen={setIsConfirmPasswordVisible}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            />
          </div>
          <ErrorMessage
            className="ml-2 -mt-5 text-base text-red-600"
            errorMessage={errors.confirmPassword?.message}
          />

          <button
            aria-label="Submit to register"
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition text-lg font-semibold"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-base text-gray-700">
          Already have an account?
          <Link
            aria-label="Go to login page"
            href="./login"
            className="text-blue-600 hover:underline hover:text-blue-700 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
