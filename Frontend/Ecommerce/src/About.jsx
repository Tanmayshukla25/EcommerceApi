import React from "react";
import { FaBoxOpen, FaTags, FaLock, FaTruck, FaHeadset } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 from-blue-50 to-indigo-100  px-4 py-12">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          📦 Start Shopping Today!
        </h2>
        <p className="text-center text-gray-600">
          Whether you're upgrading your wardrobe, hunting for the perfect gadget, or finding home essentials, we’re here to make it all possible—fast, simple, and safe.
        </p>

       
        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <FaBoxOpen className="text-blue-600 text-2xl mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Wide Range of Products</h3>
            <p className="text-gray-600">
              From fashion to electronics, home decor to daily essentials—we’ve got something for everyone.
            </p>
          </div>
        </div>

   
        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <FaTags className="text-green-500 text-2xl mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Affordable Prices</h3>
            <p className="text-gray-600">
              Get the best deals without compromising on quality.
            </p>
          </div>
        </div>

       
        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <FaLock className="text-purple-500 text-2xl mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Secure Shopping</h3>
            <p className="text-gray-600">
              Shop with confidence through our encrypted and safe checkout process.
            </p>
          </div>
        </div>

       
        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <FaTruck className="text-orange-500 text-2xl mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Fast & Reliable Delivery</h3>
            <p className="text-gray-600">
              Get your orders delivered quickly, right to your doorstep.
            </p>
          </div>
        </div>

       
        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <FaHeadset className="text-pink-500 text-2xl mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Customer-Centric Support</h3>
            <p className="text-gray-600">
              Our team is here to help you, always—before, during, and after your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
