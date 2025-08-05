import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import instance from "./axiosConfig.js";

function First() {
  const [Cart, setCart] = useState(0);
  const [addtocartid, setAddtocartid] = useState([]);
  const [data, setData] = useState([]);
  const [Quantity, setQuantity] = useState(1);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [input, setInput] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  

    fetchData();
  }, []);
    async function fetchData() {
      try {
       
        const userResponse = await instance.get("/user/checkToken", {
          withCredentials: true,
        });
        const userData = userResponse.data?.User;

        if (userData?._id) {
          setUser({
            _id: userData._id,
            role: userData.role || "student",
          });
        } else {
          setUser(null);
        }

     
        const wishlistRes = await instance.get("/product/wishlist/Data", {
          withCredentials: true,
        });
        if (wishlistRes.data?.wishlist) {
          const cleanedWishlist = wishlistRes.data.wishlist.filter(
            (item) => item?.product
          );
          setWishlistIds(cleanedWishlist.map((item) => item.product._id));
        }

        const cartRes = await instance.get("/product/cart/data", {
          withCredentials: true,
        });
        if (cartRes.data?.cart) {
          const cleanedCart = cartRes.data.cart.filter((item) => item?.product);
          setCart(cleanedCart.length);
        }
      } catch (e) {
        console.error("Data fetch error:", e);
        setUser(null);
        setWishlistIds([]);
        setCart(0);
      } finally {
        setLoading(false);
      }
    }

  const AddtoWishlist = (productId) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  return (
    <UserContext.Provider
      value={{
        Cart,
        setCart,
        wishlistIds,
        setWishlistIds,
        addtocartid,
        setAddtocartid,
        setCartItems,
        cartItems,
        data,
        setData,
        Quantity,
        setQuantity,
        AddtoWishlist,
        input,
        setInput,
        user,
        setUser,
        loading,
        setLoading,
        fetchData
      }}
    >
      <Header />
      <Outlet />
    </UserContext.Provider>
  );
}

export default First;