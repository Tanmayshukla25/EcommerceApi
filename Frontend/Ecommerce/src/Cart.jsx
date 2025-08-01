import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { RxCross2 } from "react-icons/rx";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate } from "react-router-dom";
import instance from "./axiosConfig.js";

function Cart() {
  const { Cart, setCart, cartItems, setCartItems ,currentUser} = useContext(UserContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true);
        const response = await instance.get(
          "http://localhost:4040/product/cart/data",
          {
            withCredentials: true,
          }
        );

        const cart = response.data?.cart;
        console.log(cart);
        
        if (Array.isArray(cart)) {
          setCartItems(cart); 
          setCart(cart.length);
        } else {
          setCartItems([]);
          setCart(0);
        }
      } catch (error) {
        console.error("Cart fetch error:", error);
        toast.error("Failed to load cart");
        setCartItems([]);
        setCart(0);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
    
  }, []);



const handleRemove = async (itemId) => {
  if (!currentUser) {
    Navigate(`/login?referer=${encodeURIComponent(location.pathname)}`);
    return;
  }

  try {
    await instance.delete(
      `http://localhost:4040/product/cartData/remove/${itemId}`,
      {
        withCredentials: true,
      }
    );

  
    const updatedCart = cartItems.filter(
      (item) => item.product._id !== itemId
    );

    setCartItems(updatedCart);
    setCart(updatedCart.length);
  } catch (error) {
    console.error("Remove error:", error);
    toast.error("Failed to remove product");
  }
};

 
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const price = item.product?.discountedPrice || 0;
      return acc + price * item.quantity;
    }, 0);
    setTotalAmount(total);
  }, [cartItems]);

  console.log(cartItems);
  

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-500 py-10 px-4 sm:px-8">
      <ToastContainer />
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
            Your cart is empty.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col sm:flex-row items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images?.[0] || "/no-image.png"}
                    alt={item.product.title}
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.product.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <span className="text-xl font-bold text-green-600 flex items-center">
                    <PiCurrencyDollarBold />
                    {item.product.discountedPrice || 0}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemove(item.product._id)}
                  >
                    <RxCross2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right pt-4 border-t mt-4">
              <p className="text-xl font-semibold text-gray-700">
                Total:{" "}
                <span className="text-green-600">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(totalAmount)}
                </span>
              </p>
              <Link to="/">
                <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
