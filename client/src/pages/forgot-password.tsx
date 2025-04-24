import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

type FormData = {
  email: string;
  otp?: string;
};

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle submission logic here (optional)
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Forgot Your Password?
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input and Send OTP Button */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-xs">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
          </div>

          {/* OTP Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="otp" className="text-sm">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('otp', { required: 'OTP is required' })}
            />
            {errors.otp && (
              <p className="text-red-600 text-xs">{errors.otp.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>

          <p className="text-sm text-center mt-4">
            Remember your password?
            <Link href="/login" className="text-blue-600 hover:underline ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
