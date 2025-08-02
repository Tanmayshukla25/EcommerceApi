import React, { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { RxCross2 } from "react-icons/rx";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import instance from "./axiosConfig.js";

const Wishlist = () => {
  const { wishlistIds, setWishlistIds } = useContext(UserContext);
 console.log(wishlistIds);

  
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await instance.get(
          "/product/wishlist/Data",
          {
            withCredentials: true,
          }
        );
        
        const wishlist = response.data?.wishlist;
        
        if (Array.isArray(wishlist)) {
          setWishlistIds(wishlist);
       
        } else {
          setWishlistIds([]);
        }
      } catch (error) {
        console.error("Wishlist fetch error:", error);
        toast.error("Failed to load wishlist");
        setWishlistIds([]);
      }
    }

    fetchWishlist();
  }, []);


const handleRemove = async (productId) => {
  try {
    const response = await axios.delete(
      `/product/wishlist/remove/${productId}`,
      {
        withCredentials: true,
      }
    );

    if (response.data && Array.isArray(response.data.wishlist)) {
      setWishlistIds(response.data.wishlist);
    }

    toast.success("Item removed from wishlist");
  } catch (error) {
    console.error("Remove error:", error);
    toast.error("Failed to remove item from wishlist");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 mt-20 px-4 sm:px-8">
      <ToastContainer />
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Wishlist</h2>

        {wishlistIds.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
            Your wishlist is empty.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {wishlistIds
              .filter((item) => item && item.product)
              .map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.images?.[0] || "ProductImg"}
                      alt={"ProductImg"}
                      className="w-24 h-24 object-contain rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.product.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <span className="text-xl font-bold text-green-600 flex items-center">
                      <PiCurrencyDollarBold />
                      {item.product.discountedPrice || 0}
                    </span>
                    <button className="text-red-500 hover:text-red-700"onClick={() => handleRemove(item.product._id)}>
                      <RxCross2 size={20} />
                    </button>
                  </div>
                </div>
              ))}

            <div className="text-right pt-4 border-t mt-4">
              <Link to="/">
                <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
