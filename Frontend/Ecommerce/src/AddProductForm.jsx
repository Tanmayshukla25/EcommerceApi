import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import instance from "./axiosConfig.js";

function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    quantity: 0,
    originalPrice: 0,
    discountedPrice: 0,
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();

    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      const res = await instance.post(
        "http://localhost:4040/product/add",
        payload
      );
      console.log("Upload success:", res.data);
      toast.success("Product uploaded successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-20 from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600">
            Fill in the details to add your product
          </p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug
                </label>
                <input
                  name="slug"
                  placeholder="product-url-slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                />
              </div>

              {/* Category */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  name="category"
                  placeholder="Select or enter category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                />
              </div>

              {/* Quantity and Prices Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price
                  </label>
                  <input
                    name="originalPrice"
                    type="number"
                    placeholder="₹0"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sale Price
                  </label>
                  <input
                    name="discountedPrice"
                    type="number"
                    placeholder="₹0"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your product in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none resize-none bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                />
              </div>

              {/* File Upload */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                    className="w-full border-2 border-dashed border-gray-300 px-4 py-6 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none bg-white/30 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-blue-50 file:to-indigo-50 file:text-blue-700 hover:file:from-blue-100 hover:file:to-indigo-100 group-hover:border-blue-400"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center text-gray-500">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400 mb-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-sm">
                        Click to upload or drag and drop
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800"
                } text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 transform ${
                  loading ? "" : "hover:scale-[1.02] hover:shadow-2xl"
                } focus:ring-4 focus:ring-blue-200 focus:outline-none shadow-lg active:scale-[0.98] relative overflow-hidden group`}
              >
                <span className="relative z-10">
                  {loading ? "Uploading..." : "Add Product to Inventory"}
                </span>
                {!loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            All fields are required unless marked optional
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;
