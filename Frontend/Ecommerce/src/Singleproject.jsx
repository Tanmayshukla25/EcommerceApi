import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaHeart, FaStar, FaArrowLeft } from "react-icons/fa";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import instance from "./axiosConfig.js";

function Singleproject() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const {
    wishlistIds,
    // setWishlistIds,

    Quantity,
    currentUser,
    Cart,
    // setCart,
  } = useContext(UserContext);

  const isWishlisted = wishlistIds.includes(product?.id);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const { data } = await instance.get(
          `/product/${id}`
        );

        setProduct(data);
      } catch (e) {
        console.error("Error fetching product:", e);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  async function handleAddCart() {
    if (!currentUser) {
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
    console.log("Tanmay");
    console.log(currentUser);

    if (!currentUser) {
      navigate(`/login?referer=${encodeURIComponent(location.pathname)}`);
      return;
    }
    setWishlistLoading(true);
    try {
      await instance.post(
        `/wishlist/${id}`,
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

            
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="font-medium">In Stock</span>
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
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-lg">
            <p className="text-lg">Related products will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singleproject;
