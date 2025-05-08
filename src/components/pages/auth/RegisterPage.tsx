"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/common/ErrorMessage";
import { EyeToggleButton } from "@/components/common/EyeToggleButton";
import registerAction from "@/actions/auth/registerAction";
import { toast } from "sonner";
import { registerSchema } from "@/lib/zod";

const RegisterPage = () => {
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
    if (!res.success) {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-4"
        >
          <Input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage
            className="ml-2 -mt-2 text-sm"
            errorMessage={errors.name?.message}
          />
          <Input
            {...register("email")}
            type="text  "
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage
            className="ml-2 -mt-2 text-sm"
            errorMessage={errors.email?.message}
          />
          <div className="relative">
            <Input
              {...register("password")}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="px-4 pr-14 w-full py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <EyeToggleButton
              eyeIsOpen={isPasswordVisible}
              setEyeIsOpen={setIsPasswordVisible}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
            />
          </div>
          <ErrorMessage
            className="ml-2 -mt-2"
            errorMessage={errors.password?.message}
          />
          <div className="relative">
            <Input
              {...register("confirmPassword")}
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="px-4 pr-14 py-2 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <EyeToggleButton
              eyeIsOpen={isConfirmPasswordVisible}
              setEyeIsOpen={setIsConfirmPasswordVisible}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
            />
          </div>
          <ErrorMessage
            className="ml-2 -mt-2 text-sm"
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
