import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
const AddToCart = () => {
  const { wishlistIds, setWishlistIds } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (!wishlistIds || wishlistIds.length === 0) {
        setProducts([]);
        return;
      }

      const items = [];

      for (let id of wishlistIds) {
        try {
          if (id) {
            const res = await axios.get(`https://ecommerce-api-8ga2.onrender.com/api/product/${id}`);
            items.push(res.data);
          }
        } catch (err) {
          console.error(`Failed to fetch product with _id ${id}:`, err);
        }
      }

      setProducts(items);
    };

    fetchWishlistItems();
  }, [wishlistIds]);

  const removeFromWishlist = (id) => {
    setProducts((prev) => prev.filter((item) => item._id !== id));
    setWishlistIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  if (!wishlistIds || wishlistIds.length === 0 || products.length === 0) {
    return (
      <h2 className="text-center text-2xl mt-24 font-semibold text-gray-700">
        ❤️ Your Wishlist is Empty
      </h2>
    );
  }

  return (
    <div className="mt-24 w-full  mx-auto px-4 space-y-6">
      {products.map((item) => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row items-center justify-between border rounded-lg shadow p-4 bg-white"
        >
          <img
            src={item.url}
            alt={item.title}
            className="w-40 h-40 object-contain bg-gray-100 rounded-md"
          />
          <div className="flex-1 md:ml-6 mt-4 md:mt-0">
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-gray-700">Price: ${item.price}</p>
            <p className="text-gray-600">Rating: {item.rating?.rate}</p>
          </div>
          <button
            onClick={() => removeFromWishlist(item._id)}
            className="text-red-500 text-2xl hover:text-red-700 mt-4 md:mt-0"
          >
       <RxCross2 />
          </button>
        </div>
      ))}

      <div className="text-right text-xl font-semibold text-gray-800">
        Total Wishlist Items: {products.length}
      </div>
    </div>
  );
};

export default AddToCart;
