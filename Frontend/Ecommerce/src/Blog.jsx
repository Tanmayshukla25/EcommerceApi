import React from "react";
import { FaShoppingBasket, FaTshirt, FaLaptop, FaGift, FaRecycle } from "react-icons/fa";

function Blog() {
  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📝 Top Products 2025</h2>
        <ul className="space-y-5">

          <li className="flex items-start bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg shadow-sm">
            <FaShoppingBasket className="text-blue-600 text-xl mr-3 mt-1" />
            <span className="text-gray-700 font-medium">Best-Selling Products of the Month</span>
          </li>

          <li className="flex items-start bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg shadow-sm">
            <FaTshirt className="text-pink-500 text-xl mr-3 mt-1" />
            <span className="text-gray-700 font-medium">2025 Fashion Trends You Can’t Miss</span>
          </li>

          <li className="flex items-start bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg shadow-sm">
            <FaLaptop className="text-green-500 text-xl mr-3 mt-1" />
            <span className="text-gray-700 font-medium">Tech Essentials Every Student Should Own</span>
          </li>

          <li className="flex items-start bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg shadow-sm">
            <FaGift className="text-purple-500 text-xl mr-3 mt-1" />
            <span className="text-gray-700 font-medium">Gift Guide for Every Occasion</span>
          </li>

          <li className="flex items-start bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg shadow-sm">
            <FaRecycle className="text-yellow-500 text-xl mr-3 mt-1" />
            <span className="text-gray-700 font-medium">How We Pack Sustainably</span>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Blog;
