import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import instance from "./axiosConfig.js";
import { UserContext } from "./UserContext";

function AddProductForm() {
  const { user, loading } = useContext(UserContext);

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
  const [loadingSubmit, setLoadingSubmit] = useState(false);

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
    setLoadingSubmit(true);

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }
    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      const res = await instance.post("/product/add", payload);
      console.log("Upload success:", res.data);
      toast.success("Product uploaded successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Check console.");
    } finally {
      setLoadingSubmit(false);
    }
  };


  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;


  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-500 py-8 px-4 relative overflow-hidden">
    
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
          <p className="text-white">Fill in the details to add your product</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
            {[
              { label: "Product Name", name: "name", placeholder: "Enter product name" },
              { label: "URL Slug", name: "slug", placeholder: "product-url-slug" },
              { label: "Category", name: "category", placeholder: "Select or enter category" },
            ].map((field) => (
              <div key={field.name} className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                <input
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm"
                />
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Quantity", name: "quantity" },
                { label: "Original Price", name: "originalPrice" },
                { label: "Sale Price", name: "discountedPrice" },
              ].map((field) => (
                <div key={field.name} className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  <input
                    name={field.name}
                    type="number"
                    placeholder="0"
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              ))}
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe your product in detail..."
                value={formData.description}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border-2 border-dashed border-gray-300 px-4 py-6 rounded-xl bg-white/30 backdrop-blur-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loadingSubmit}
              className={`w-full ${
                loadingSubmit
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700"
              } text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg`}
            >
              {loadingSubmit ? "Uploading..." : "Add Product to Inventory"}
            </button>
          </div>
        </form>

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
