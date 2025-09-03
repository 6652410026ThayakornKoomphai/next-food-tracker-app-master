'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUtensils, FaImage, FaCalendarAlt, FaChevronLeft, FaSave } from 'react-icons/fa';

export default function Page() {
  const [formData, setFormData] = useState({
    foodName: '',
    mealType: '',
    date: '',
    foodImage: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, foodImage: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Food Data to be saved:', formData);
    // In a real application, you would send this data to an API
    alert('Food saved successfully!');
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-6">
      <div className="w-full max-w-lg rounded-lg bg-white bg-opacity-90 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Add New Food
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ช่อง input ชื่ออาหาร */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaUtensils />
            </div>
            <input
              type="text"
              name="foodName"
              placeholder="Food Name"
              value={formData.foodName}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* ช่องเลือกมื้ออาหาร */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaUtensils />
            </div>
            <select
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="" disabled>Select Meal Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          {/* ช่องเลือกวันเดือนปี */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaCalendarAlt />
            </div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* ช่องเลือกรูปภาพพร้อมพรีวิว */}
          <div className="flex items-center space-x-4">
            <label htmlFor="foodImage" className="flex-1 cursor-pointer rounded-full bg-gray-200 px-6 py-2 text-center text-gray-600 transition-colors hover:bg-gray-300">
              <div className="flex items-center justify-center space-x-2">
                <FaImage />
                <span>Choose Food Image</span>
              </div>
            </label>
            <input
              id="foodImage"
              type="file"
              name="foodImage"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {imagePreview && (
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-red-500 shadow-md">
                <Image
                  src={imagePreview}
                  alt="Food Preview"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          {/* ปุ่มบันทึกและย้อนกลับ */}
          <div className="flex flex-col-reverse space-y-2 space-y-reverse md:flex-row md:space-x-4 md:space-y-0">
            <Link href="/dashboard" passHref className="w-full md:w-1/2">
              <button
                type="button"
                className="flex w-full items-center justify-center space-x-2 rounded-full bg-gray-400 py-3 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50"
              >
                <FaChevronLeft />
                <span>Go Back</span>
              </button>
            </Link>
            <button
              type="submit"
              className="flex w-full items-center justify-center space-x-2 rounded-full bg-red-500 py-3 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 md:w-1/2"
            >
              <FaSave />
              <span>Save Food</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}