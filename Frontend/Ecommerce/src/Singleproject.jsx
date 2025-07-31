import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaHeart, FaStar, FaArrowLeft } from "react-icons/fa";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";

function Singleproject() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const {
    wishlistIds,
    setWishlistIds,

    Quantity,

    Cart,
    setCart,
  } = useContext(UserContext);

  const isWishlisted = wishlistIds.includes(product?.id);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:4040/product/${id}`);

        setProduct(data);
      } catch (e) {
        console.error("Error fetching product:", e);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
   async function fetchUser() {
  try {
    const response = await axios.get(
          "http://localhost:4040/user/checkToken", 
      { withCredentials: true }
    );

    // if (!response.data?.User) {
    //   throw new Error("User not found in token response");
    // }

    // setCurrentUser(response.data.User);
    const user = response.data?.User || response.data?.user || response.data;

if (!user || !user._id) {
  throw new Error("User not found in token response");
}

setCurrentUser(user);

  } catch (e) {
    console.error("User fetch error:", e);
    setCurrentUser(null);
  }
}


    fetchUser();
  }, []);


async function handleAddCart() {
  if (!currentUser) {
    navigate(`/login?referer=${encodeURIComponent(location.pathname)}`);
    return;
  }

  try {
    await axios.post(
      `http://localhost:4040/product/cart/${id}`,
      { quantity: Quantity || 1 },
      { withCredentials: true }
    );
    console.log(Cart);



  
    navigate("/cart");

    setDisabled(true); 
  } catch (error) {
    console.log("Add to cart error:", error);
    toast.error("Failed to add to cart");
  }
}



 
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ToastContainer />
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <FaArrowLeft size={16} />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            <div className="flex items-center justify-center bg-gray-50 p-8 rounded-lg">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-full rounded-2xl max-h-96 object-contain hover:scale-105 transition-transform"
                />
              ) : (
                <div className="text-gray-400">No image available</div>
              )}
            </div>

            <div className="space-y-6">
              {product.category && (
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                  {product.category}
                </span>
              )}

              <h1 className="text-3xl font-bold text-gray-900">
                <span>Quantity :</span> {product.quantity}
              </h1>

              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-green-600 flex items-center">
                  <PiCurrencyDollarBold className="w-8 h-8" />
                  {product.discountedPrice}
                </span>
                <span className="text-gray-500 line-through text-lg">
                  ${(product.originalPrice * 1.2).toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                  17% OFF
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Description
                </h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleAddCart}
                  disabled={disabled}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all ${
                    disabled
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105"
                  }`}
                >
                  <HiMiniShoppingCart size={20} />
                  <span>{disabled ? "Added to Cart" : "Add to Cart"}</span>
                </button>

                <button
                  // onClick={handleWishlist}
                  className={`flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold border-2 transition-all ${
                    isWishlisted
                      ? "bg-red-50 border-red-500 text-red-600"
                      : "bg-white border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600"
                  }`}
                >
                  <FaHeart
                    size={20}
                    className={isWishlisted ? "fill-current" : ""}
                  />
                  <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>In Stock</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>2-Year Warranty</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4 text-sm text-gray-500">
                <span>🔒 Secure Payment</span>
                <span>🚚 Fast Delivery</span>
                <span>💯 Authentic Products</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="bg-white rounded-lg p-6 text-center text-gray-500">
            <p>Related products will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singleproject;
