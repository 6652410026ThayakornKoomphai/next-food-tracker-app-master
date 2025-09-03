import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import foodtracker from './images/foodtrack.jpg';

export default function Home() {
  return (
<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 p-6 text-white">
      <div className="flex flex-col items-center space-y-6 text-center">
        {/* หัวข้อหลัก */}
        <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
          Welcome to Food Tracker
        </h1>

        {/* ข้อความย่อย */}
        <p className="text-xl font-medium md:text-2xl">
          Track your meal, stay healthy!
        </p>

        {/* รูปภาพ */}
        <div className="relative h-10 w-40 md:h-100 md:w-100 ">
          <Image className="rounded-2xl"
            src={foodtracker}
            alt="Food Tracker logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* ปุ่ม */}
        <div className="flex space-x-4">
          <Link href="/register" passHref>
            <button className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-cyan-600 shadow-lg transition-transform hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
              Register
            </button>
          </Link>
          <Link href="/login" passHref>
            <button className="rounded-full bg-transparent px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform ring-2 ring-white hover:scale-105 hover:bg-white hover:text-cyan-600 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
              Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}