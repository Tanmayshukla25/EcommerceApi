import React from "react";
import { FaBoxOpen, FaTags, FaLock, FaTruck, FaHeadset } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-10 space-y-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4 tracking-tight">
          📦 Start Shopping Today!
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto text-lg">
          Whether you're upgrading your wardrobe, hunting for the perfect gadget, or finding home essentials, we’re here to make it all possible—fast, simple, and safe.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <FaBoxOpen className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Wide Range of Products</h3>
            <p className="text-gray-500 mt-2">
              From fashion to electronics, home decor to daily essentials—we’ve got something for everyone.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-3 bg-green-100 rounded-full mb-4">
              <FaTags className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Affordable Prices</h3>
            <p className="text-gray-500 mt-2">
              Get the best deals without compromising on quality.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-3 bg-purple-100 rounded-full mb-4">
              <FaLock className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Secure Shopping</h3>
            <p className="text-gray-500 mt-2">
              Shop with confidence through our encrypted and safe checkout process.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-3 bg-orange-100 rounded-full mb-4">
              <FaTruck className="text-orange-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Fast & Reliable Delivery</h3>
            <p className="text-gray-500 mt-2">
              Get your orders delivered quickly, right to your doorstep.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-3 bg-pink-100 rounded-full mb-4">
              <FaHeadset className="text-pink-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Customer-Centric Support</h3>
            <p className="text-gray-500 mt-2">
              Our team is here to help you, always—before, during, and after your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;