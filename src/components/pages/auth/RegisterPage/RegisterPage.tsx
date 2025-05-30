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
import RegisterRoleSelector, { Role } from "./RegisterRoleSelector";

export const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

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
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await registerAction(data);
      if (!res?.success) {
        return toast.error(res?.message);
      }
      if (data.role === "translator") {
        await signIn("credentials", {
          email: res.email,
          redirect: true,
          redirectTo: "/translator/dashboard",
        });
      }
      if (data.role === "client") {
        await signIn("credentials", {
          email: res.email,
          redirect: true,
          redirectTo: "/client/dashboard",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedRole) {
    return <RegisterRoleSelector setSelectedRole={setSelectedRole} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-8 text-center text-gray-900">
          Create Account
        </h1>
        <p className="text-center text-gray-600 mb-6 text-lg capitalize">
          {selectedRole === "client"
            ? "Let’s find translator out there 👀"
            : "Looks like someone’s ready to get hired 😎"}
        </p>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-8"
        >
          <input
            type="hidden"
            value={selectedRole ?? ""}
            {...register("role")}
          />

          <Input
            {...register("name")}
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
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
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
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
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              aria-label="Password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="px-5 pr-14 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md text-lg"
            />
            <EyeToggleButton
              buttonProps={{
                disabled: isSubmitting,
                "aria-disabled": isSubmitting,
              }}
              ariaLabel={
                isPasswordVisible
                  ? "Click to hide password"
                  : "Click to show password"
              }
              eyeIsOpen={isPasswordVisible}
              setEyeIsOpen={setIsPasswordVisible}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${
                isSubmitting ? "text-gray-300" : "text-gray-500"
              }`}
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
              aria-disabled={isSubmitting}
              disabled={isSubmitting}
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="px-5 pr-14 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md text-lg"
            />
            <EyeToggleButton
              buttonProps={{
                disabled: isSubmitting,
                "aria-disabled": isSubmitting,
              }}
              ariaLabel={
                isConfirmPasswordVisible
                  ? "Click to hide confirm password"
                  : "Click to show confirm password"
              }
              eyeIsOpen={isConfirmPasswordVisible}
              setEyeIsOpen={setIsConfirmPasswordVisible}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${
                isSubmitting ? "text-gray-300" : "text-gray-500"
              }`}
            />
          </div>
          <ErrorMessage
            className="ml-2 -mt-5 text-base text-red-600"
            errorMessage={errors.confirmPassword?.message}
          />

          <button
            aria-label="Submit to register"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            type="submit"
            className={`text-white py-3 rounded-xl transition text-lg font-semibold ${
              isSubmitting
                ? "bg-blue-400"
                : "bg-blue-600 cursor-pointer hover:bg-blue-700"
            }`}
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-base text-gray-700">
          Already have an account?
          <Link
            aria-label="Go to login page"
            href="./login"
            aria-disabled={isSubmitting}
            className={`text-blue-600 ${
              isSubmitting
                ? "pointer-events-none"
                : "hover:underline hover:text-blue-700 transition"
            }`}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
