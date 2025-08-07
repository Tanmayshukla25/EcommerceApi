import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  MapPin,
  Clock,
  CreditCard,
  Package,
  X,
  CheckCircle,
  Phone,
  Hash,
} from "lucide-react";
import instance from "./axiosConfig";

const PlaceOrder = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryType, setDeliveryType] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const { data } = await instance.get(`/product/${id}`);
        setProduct(data);
      } catch (error) {
        console.log("Error fetching product details", error);
      }
    }

    fetchProductDetails();
  }, [id]);

  if (!isOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!address.trim() || !pincode.trim() || !phoneNumber.trim()) {
      setError(true);
      return;
    }

    if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }

    if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    const orderData = {
      address,
      pincode,
      phoneNumber,
      deliveryType,
      paymentMethod,
    };
    console.log("Order Placed:", orderData);
    setOrderPlaced(true);

    setTimeout(() => {
      onClose();
      navigate("/");
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center transform animate-pulse">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed!
          </h2>
          <p className="text-gray-600">
            Thank you for your order. We'll process it shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes scale-up-center {
            0% { 
              transform: scale(0.1); 
              opacity: 0;
            } 
            100% { 
              transform: scale(1);
              opacity: 1;
            }
          }

          .scale-up-center-normal { 
            animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0s 1 normal both;     
          }
        `}
      </style>
      
      <div className="fixed inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col scale-up-center-normal">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-600 p-6 text-white relative">
            <button
              onClick={() => onClose()}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Complete Your Order</h2>
                <p className="text-white/90 text-sm">
                  Review details and confirm your purchase
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <label className="text-lg font-semibold text-gray-800">
                    Contact Information
                  </label>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                      required
                      value={phoneNumber}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setPhoneNumber(value);
                        if (address.trim() && pincode.trim() && value) {
                          setError(false);
                        }
                      }}
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                    />
                    {phoneNumber && phoneNumber.length !== 10 && (
                      <p className="text-red-500 text-sm mt-1">
                        Phone number must be 10 digits
                      </p>
                    )}
                  </div>
                  {error && (
                    <div className="text-red-600 text-sm font-medium">
                      Please fill all required fields
                    </div>
                  )}
                </div>
              </div>

              {/* Address Section */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <label className="text-lg font-semibold text-gray-800">
                    Delivery Address
                  </label>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                      required
                      rows="3"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (
                          e.target.value.trim() &&
                          pincode.trim() &&
                          phoneNumber.trim()
                        ) {
                          setError(false);
                        }
                      }}
                      placeholder="House/Flat No., Building, Street, Area, Landmark..."
                    />
                  </div>
                  {error && (
                    <div className="text-red-600 text-sm font-medium">
                      Please fill all required fields
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                        required
                        value={pincode}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6);
                          setPincode(value);
                          if (address.trim() && value && phoneNumber.trim()) {
                            setError(false);
                          }
                        }}
                        placeholder="Enter 6-digit pincode"
                        maxLength="6"
                      />
                    </div>
                    {pincode && pincode.length !== 6 && (
                      <p className="text-red-500 text-sm mt-1">
                        Pincode must be 6 digits
                      </p>
                    )}
                  </div>
                  {error && (
                    <div className="text-red-600 text-sm font-medium">
                      Please fill all required fields
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <label className="text-lg font-semibold text-gray-800">
                    Delivery Options
                  </label>
                </div>
                <div className="space-y-3">
                  {/* Standard */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      deliveryType === "standard"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryType === "standard"}
                      onChange={() => setDeliveryType("standard")}
                      className="w-4 h-4 text-yellow-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        Standard Delivery
                      </div>
                      <div className="text-sm text-gray-600">
                        3-5 business days • Free
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">₹0</div>
                  </label>

                  {/* Express */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      deliveryType === "express"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryType === "express"}
                      onChange={() => setDeliveryType("express")}
                      className="w-4 h-4 text-yellow-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        Express Delivery
                      </div>
                      <div className="text-sm text-gray-600">
                        1-2 business days • Fast
                      </div>
                    </div>
                    <div className="text-orange-600 font-semibold">₹100</div>
                  </label>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <label className="text-lg font-semibold text-gray-800">
                    Payment Method
                  </label>
                </div>
                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 text-yellow-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        Cash on Delivery
                      </div>
                      <div className="text-sm text-gray-600">
                        Pay when you receive
                      </div>
                    </div>
                  </label>

                  {/* UPI */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === "upi"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="w-4 h-4 text-yellow-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        UPI / Google Pay
                      </div>
                      <div className="text-sm text-gray-600">
                        Instant digital payment
                      </div>
                    </div>
                  </label>

                  {/* Card */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-4 h-4 text-yellow-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        Credit / Debit Card
                      </div>
                      <div className="text-sm text-gray-600">
                        Secure card payment
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Discounted Price</span>
                    <span className="font-semibold text-gray-800">
                      ₹{product?.discountedPrice || 0}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Product Name</span>
                    <span className="font-semibold text-gray-800">
                      {product?.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Category</span>
                    <span className="text-[12px] md:font-semibold text-gray-800">
                      {product?.category}
                    </span>
                  </div>
                   
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Original Price</span>
                    <span className="font-semibold text-gray-800">
                     ₹{product?.originalPrice}
                    </span>
                  </div>

                   <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Description</span>
                    <span className="font-semibold text-gray-800">
                      {product?.description}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Delivery Charges</span>
                     <span
                      className={`font-semibold ${
                        deliveryType === "express"
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {deliveryType === "express" ? "₹100" : "Free"}
                    </span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between items-center py-3">
                    <span className="text-xl font-bold text-gray-800">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-yellow-600">
                      ₹
                      {product?.discountedPrice
                        ? deliveryType === "express"
                          ? product.discountedPrice + 100
                          : product.discountedPrice
                        : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => onClose()}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handlePlaceOrder}
                className="bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-800 hover:to-gray-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;