'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Corrected import for App Router

export default function Page() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    // Logic for login authentication (e.g., API call) goes here
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 p-6">
      <div className="w-full max-w-sm rounded-lg bg-white bg-opacity-90 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* อีเมล */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* รหัสผ่าน */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ปุ่ม Login */}
          <button
            type="submit"
            className="w-full rounded-full bg-indigo-500 py-3 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

        {/* ลิงก์ไปยังหน้า Register */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don{"'"}t have an account?{' '}
          <Link href="/register" passHref>
            <span className="font-semibold text-indigo-600 transition-colors hover:text-indigo-800 hover:underline">
              Register here
            </span>
          </Link>
        </p>
      </div>
    </main>
  );
}