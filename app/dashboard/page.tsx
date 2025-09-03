'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

// Mock Data
interface FoodItem {
  id: number;
  name: string;
  meal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  imageUrl: string;
}

const MOCK_FOOD_DATA: FoodItem[] = [
  { id: 1, name: 'Scrambled Eggs', meal: 'Breakfast', imageUrl: '/food-images/egg.png' },
  { id: 2, name: 'Chicken Salad', meal: 'Lunch', imageUrl: '/food-images/salad.png' },
  { id: 3, name: 'Salmon with Asparagus', meal: 'Dinner', imageUrl: '/food-images/salmon.png' },
  { id: 4, name: 'Yogurt with Berries', meal: 'Snack', imageUrl: '/food-images/yogurt.png' },
  { id: 5, name: 'Oatmeal', meal: 'Breakfast', imageUrl: '/food-images/oatmeal.png' },
  { id: 6, name: 'Beef Stir-fry', meal: 'Lunch', imageUrl: '/food-images/stirfry.png' },
  { id: 7, name: 'Pasta with Pesto', meal: 'Dinner', imageUrl: '/food-images/pasta.png' },
  { id: 8, name: 'Apple Slices', meal: 'Snack', imageUrl: '/food-images/apple.png' },
  { id: 9, name: 'Smoothie', meal: 'Breakfast', imageUrl: '/food-images/smoothie.png' },
  { id: 10, name: 'Grilled Cheese', meal: 'Lunch', imageUrl: '/food-images/grilledcheese.png' },
];

const ITEMS_PER_PAGE = 5;

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // ฟังก์ชันสำหรับค้นหา (จำลอง)
  const filteredData = MOCK_FOOD_DATA.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // การคำนวณ Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Placeholder functions for buttons
  const handleEdit = (id: number) => {
    console.log(`Editing food item with ID: ${id}`);
    // You would typically redirect to an edit page or show a modal
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting food item with ID: ${id}`);
    // You would typically call an API to delete the item
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600">
      <div className="mx-auto max-w-5xl rounded-lg bg-white bg-opacity-90 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          My Food Dashboard
        </h1>

        {/* Header: Add Food Button & Search Bar */}
        <div className="mb-6 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <Link href="/addfood" passHref>
            <button className="flex items-center space-x-2 rounded-full bg-emerald-500 px-6 py-2 text-white shadow-lg transition-transform hover:scale-105 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50">
              <FaPlus />
              <span>Add Food</span>
            </button>
          </Link>
          <div className="flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Search food by name..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full rounded-l-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              className="rounded-r-full border border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Food List Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Food Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Meal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-full"
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{item.meal}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                        aria-label={`Edit ${item.name}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                        aria-label={`Delete ${item.name}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    No food items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}