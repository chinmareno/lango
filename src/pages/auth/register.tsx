import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const RegisterPage = () => {
  const userForm = z
    .object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address'),
      password: z
        .string()
        .min(6, 'Password must be at least 6 characters long'),
      confirmPassword: z.string().min(1, 'Confirm Password is required'),
    })
    .refine(
      (data) => {
        return (
          data.password.length != 6 || data.password === data.confirmPassword
        );
      },
      { message: 'Passwords do not match', path: ['confirmPassword'] }
    );

  type UserSchema = z.infer<typeof userForm>;

  const {
    register,
    formState: { errors: inputErrors },
    handleSubmit,
    clearErrors,
  } = useForm<UserSchema>({
    resolver: zodResolver(userForm),
  });

  const onSubmit = (data: UserSchema) => console.log(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register('name')}
            onChange={() => clearErrors('name')}
            type="text"
            placeholder="Name"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {inputErrors.name && <p>{inputErrors.name.message}</p>}
          <input
            {...register('email')}
            onChange={() => clearErrors('email')}
            type="text  "
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {inputErrors.email && <p>{inputErrors.email.message}</p>}
          <input
            {...register('password')}
            onChange={() => clearErrors('password')}
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {inputErrors.password && <p>{inputErrors.password.message}</p>}
          <input
            {...register('confirmPassword')}
            onChange={() => clearErrors('confirmPassword')}
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {inputErrors.confirmPassword && (
            <p>{inputErrors.confirmPassword.message}</p>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
