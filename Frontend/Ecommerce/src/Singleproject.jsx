import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaHeart, FaStar, FaArrowLeft } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import instance from "./axiosConfig.js";
import { MdDelete, MdEdit } from "react-icons/md";

function Singleproject() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { wishlistIds, Quantity, user, Cart ,CartDetials} = useContext(UserContext);

  const isWishlisted = wishlistIds.includes(product?.id);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    originalPrice: "",
    discountedPrice: "",
    description: "",
    image: null,
  });

 
  useEffect(() => {
     window.scrollTo(0, 0);
    async function fetchProduct() {
      setLoading(true);
      try {
        const { data } = await instance.get(`/product/${id}`);
        setProduct(data);
        setFormData({
          name: data.name || "",
          category: data.category || "",
          quantity: data.quantity || "",
          originalPrice: data.originalPrice || "",
          discountedPrice: data.discountedPrice || "",
          description: data.description || "",
          image: null,
        });

        
        const allProductsRes = await instance.get("/product/all");
        const allProducts = allProductsRes.data;

        const related = allProducts.filter(
          (item) => item.category === data.category && item._id !== data._id
        );
        setRelatedProducts(related);
        
        // const CartDetial=CartDetials
        // const cartItems=CartDetial.filter((item)=>item._id)

        
      } catch (e) {
        console.error("Error fetching product or related:", e);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  async function handleAddCart() {
    if (!user) {
      navigate(`/login?referer=${encodeURIComponent(location.pathname)}`);
      return;
    }
    setCartLoading(true);

    try {
      await instance.post(
        `/product/cart/${id}`,
        { quantity: Quantity || 1 },
        { withCredentials: true }
      );
      console.log(Cart);

      toast.success("Product Add", {
        autoClose: 2000,
      });

      navigate("/cart");

      setDisabled(true);
    } catch (error) {
      console.log("Add to cart error:", error);
      toast.error("Failed to add to cart");
    } finally {
      setCartLoading(false);
    }
  }

  async function HandleWishlist() {
    if (!user) {
      navigate(`/login?referer=${encodeURIComponent(location.pathname)}`);
      return;
    }
    setWishlistLoading(true);
    try {
      await instance.post(
        `/product/wishlist/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success("SuccessFully AddToWishlist", {
        autoClose: 2000,
      });
      navigate("/Wishlist");
    } catch (error) {
      console.log("Add to cart error:", error);
      toast.error("Failed to add to cart");
    } finally {
      setWishlistLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirm) return;

      await instance.delete(`/product/delete/${id}`, {
        withCredentials: true,
      });

      toast.success("Product deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Delete Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["quantity", "originalPrice", "discountedPrice"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedForm = new FormData(); 

    updatedForm.append("name", formData.name);
    updatedForm.append("category", formData.category);
    updatedForm.append("quantity", Number(formData.quantity));
    updatedForm.append("originalPrice", Number(formData.originalPrice));
    updatedForm.append("discountedPrice", Number(formData.discountedPrice));
    updatedForm.append("description", formData.description);

    if (formData.image) {
      updatedForm.append("image", formData.image); 
    }

    for (let [key, value] of updatedForm.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const { data } = await instance.put(
        `/product/update/${id}`,
        updatedForm,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      toast.success("Product updated successfully");
      setProduct(data);
      setEditing(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      console.error("Update error:", errorMessage);

      if (err.response?.status === 401) {
        toast.error("Please log in as an admin to update the product");
        navigate("/login");
      } else if (err.response?.status === 403) {
        toast.error("Unauthorized: Admin access required");
      } else if (err.response?.status === 404) {
        toast.error("Product not found");
      } else {
        toast.error(`Failed to update product: ${errorMessage}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-700 flex items-center justify-center">
        <ToastContainer />
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-gradient-to-r from-yellow-300 to-pink-300 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-300 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gray-500 py-8">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-300 hover:text-yellow-300 mb-8 transition-colors duration-300"
        >
          <FaArrowLeft size={16} />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            <div className="flex items-center justify-center  p-10 rounded-2xl">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-[500px] h-[400px]  rounded-2xl max-h-96 object-cover hover:scale-105 transition-transform duration-300 "
                />
              ) : (
                <div className="text-gray-400 text-lg">No image available</div>
              )}
            </div>

            <div className="space-y-6">
              {product.category && (
                <span className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-yellow-100 to-pink-100 text-gray-800 rounded-full capitalize shadow-sm">
                  {product.category}
                </span>
              )}

              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-700">
                  Quantity Available:
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-lg font-bold text-gray-800">
                  {product.quantity}
                </span>
              </div>

              <div className=" border-l-5 border-emerald-500 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-4xl font-bold text-green-600 flex items-center">
                    ₹{product.discountedPrice}
                  </span>
                  <span className="text-gray-500 line-through text-xl">
                    ₹{product.originalPrice}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {Math.round(
                      ((product.originalPrice - product.discountedPrice) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                  <span className="text-green-600 font-semibold">
                    You save ₹{product.originalPrice - product.discountedPrice}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {user?.role === "admin" ? (
                  <>
                    <button
                      className="flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={handleDelete}
                    >
                      <MdDelete size={24} /> <span>Delete Product</span>
                    </button>

                    <button
                      className="flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={() => setEditing(true)}
                    >
                      <MdEdit size={24} /> <span>Edit Product</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleAddCart}
                      disabled={disabled || cartLoading}
                      className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        disabled || cartLoading
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white transform hover:scale-105 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      <HiMiniShoppingCart size={20} />
                      <span>
                        {cartLoading
                          ? "Adding..."
                          : disabled
                          ? "Added to Cart"
                          : "Add to Cart"}
                      </span>
                    </button>

                    <button
                      onClick={HandleWishlist}
                      disabled={wishlistLoading}
                      className={`flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold border-2 transition-all duration-300 ${
                        isWishlisted
                          ? "bg-red-50 border-red-500 text-red-600"
                          : "bg-white border-gray-300 text-gray-700 hover:border-pink-400 hover:text-pink-600 hover:scale-105"
                      }`}
                    >
                      <FaHeart
                        size={20}
                        className={isWishlisted ? "fill-current" : ""}
                      />
                      <span>
                        {wishlistLoading
                          ? "Adding..."
                          : isWishlisted
                          ? "Wishlisted"
                          : "Add to Wishlist"}
                      </span>
                    </button>
                  </>
                )}
              </div>
              {editing && (
                <form
                  onSubmit={handleUpdate}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 mt-8 shadow-2xl border border-gray-100 space-y-6 backdrop-blur-sm"
                  encType="multipart/form-data"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      Edit Product
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm group-hover:border-gray-300"
                      />
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm group-hover:border-gray-300"
                      />
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="relative group">
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm group-hover:border-gray-300"
                      />
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="relative group">
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        placeholder="Original Price"
                        className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm group-hover:border-gray-300"
                      />
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="relative group sm:col-span-2">
                      <input
                        type="number"
                        name="discountedPrice"
                        value={formData.discountedPrice}
                        onChange={handleChange}
                        placeholder="Discounted Price"
                        className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm group-hover:border-gray-300"
                      />
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Product Description"
                      className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none group-hover:border-gray-300"
                      rows="4"
                    />
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Product Image
                    </label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors duration-300 bg-gray-50/50">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-600 font-medium">
                          Click to upload image
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-green-200 outline-none"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Update Product
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-gray-500 hover:to-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-gray-200 outline-none"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Cancel
                      </span>
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="font-medium">In Stock : {formData.quantity}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                  <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                  <span className="font-medium">30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                  <span className="font-medium">2-Year Warranty</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-6 pt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2">
                  <span>🔒</span>
                  <span className="font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🚚</span>
                  <span className="font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>💯</span>
                  <span className="font-medium">Authentic Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-6 text-center">
            You Might Also Like
          </h2>
          {relatedProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-lg">
              <p className="text-lg">No related products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2   sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-xl sm:w-[100px]  md:h-[340px] md:w-[350px] shadow-md hover:shadow-lg transition duration-300"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {item.category}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-green-600 font-bold text-lg">
                      ₹{item.discountedPrice}
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      ₹{item.originalPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Singleproject;
