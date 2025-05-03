"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/common/ErrorMessage";
import { EyeToogleButton } from "@/components/common/EyeToogleButton";

const RegisterPage = () => {
  const [passwordIsShow, setPasswordIsShow] = useState(false);
  const [confirmPasswordIsShow, setConfirmPasswordIsShow] = useState(false);

  const userForm = z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
      confirmPassword: z.string().min(1, "Confirm Password is required"),
    })
    .refine(
      (data) => {
        return (
          data.password.length < 6 || data.password === data.confirmPassword
        );
      },
      { message: "Passwords do not match", path: ["confirmPassword"] }
    );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof userForm>>({
    resolver: zodResolver(userForm),
  });

  const onSubmit = async (data: z.infer<typeof userForm>) => console.log(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage
            className="ml-2 -mt-2 text-sm text-red-500"
            errorMessage={errors.name?.message}
          />
          <Input
            {...register("email")}
            type="text  "
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage
            className="ml-2 -mt-2 text-sm text-red-500"
            errorMessage={errors.email?.message}
          />
          <div className="relative">
            <Input
              {...register("password")}
              type={passwordIsShow ? "text" : "password"}
              placeholder="Password"
              className="px-4 w-full py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <EyeToogleButton
              eyeIsOpen={passwordIsShow}
              setEyeIsOpen={setPasswordIsShow}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
            />
          </div>
          <ErrorMessage
            className="ml-2 -mt-2 text-sm text-red-500"
            errorMessage={errors.password?.message}
          />
          <div className="relative">
            <Input
              {...register("confirmPassword")}
              type={confirmPasswordIsShow ? "text" : "password"}
              placeholder="Confirm Password"
              className="px-4 py-2 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <EyeToogleButton
              eyeIsOpen={confirmPasswordIsShow}
              setEyeIsOpen={setConfirmPasswordIsShow}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
            />
          </div>
          <ErrorMessage
            className="ml-2 -mt-2 text-sm text-red-500"
            errorMessage={errors.confirmPassword?.message}
          />
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
