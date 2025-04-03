'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data) => {
    // Handle signup logic here
    // For demonstration, we're just logging the data
    console.log(data);
    setError(null);

    // Simulate account creation and redirect to login
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!result?.error) {
      window.location.href = '/login';
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input {...register('email')} id="email" type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input {...register('password')} id="password" type="password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Account
        </button>
      </form>
    </div>
  );
}
