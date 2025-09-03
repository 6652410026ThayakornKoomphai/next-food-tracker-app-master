'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaImage, FaVenusMars, FaSave, FaChevronLeft } from 'react-icons/fa';

// Mock Data - In a real app, this would be an API call for the current user's data
const MOCK_USER_PROFILE = {
  id: 'user123',
  name: 'John Doe',
  email: 'johndoe@example.com',
  gender: 'male',
  imageUrl: '/profile-images/johndoe.png',
};

export default function ProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    profilePic: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load user profile data on component mount
  useEffect(() => {
    // In a real app, you would fetch the user's data from an API
    if (MOCK_USER_PROFILE) {
      setFormData({
        name: MOCK_USER_PROFILE.name,
        email: MOCK_USER_PROFILE.email,
        // We do not pre-fill the password for security reasons
        password: '', 
        gender: MOCK_USER_PROFILE.gender,
        profilePic: null, // Image file will be handled separately
      });
      setImagePreview(MOCK_USER_PROFILE.imageUrl);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, profilePic: file }));
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
    console.log('Updating user profile:', formData);
    // In a real app, you would send a PATCH/PUT request to your API
    alert('Profile updated successfully!');
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="w-full max-w-md rounded-lg bg-white bg-opacity-90 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ชื่อ-สกุล */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaUser />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* อีเมล (อาจเป็นแบบแก้ไขไม่ได้) */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              // onChange={handleChange} // Email is typically not editable
              required
              readOnly
              className="w-full rounded-full border border-gray-300 bg-gray-200 px-4 py-2 pl-10 text-gray-600 focus:outline-none"
            />
          </div>

          {/* รหัสผ่าน (เว้นว่างไว้ให้เปลี่ยน) */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              placeholder="New Password (optional)"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* เลือกเพศ */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaVenusMars />
            </div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* ช่องเลือกรูปพร้อมพรีวิว */}
          <div className="flex items-center space-x-4">
            {imagePreview && (
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-pink-500 shadow-md">
                <Image
                  src={imagePreview}
                  alt="Profile Preview"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            <label htmlFor="profilePic" className="flex-1 cursor-pointer rounded-full bg-gray-200 px-6 py-2 text-center text-gray-600 transition-colors hover:bg-gray-300">
              <div className="flex items-center justify-center space-x-2">
                <FaImage />
                <span>Choose New Profile Picture</span>
              </div>
            </label>
            <input
              id="profilePic"
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
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
              className="flex w-full items-center justify-center space-x-2 rounded-full bg-pink-500 py-3 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 md:w-1/2"
            >
              <FaSave />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}