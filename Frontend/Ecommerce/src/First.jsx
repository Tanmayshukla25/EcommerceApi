import { useState } from "react";
import { UserContext } from "./UserContext";
import { Outlet, useParams } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { useEffect } from "react";

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
  const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
   async function fetchUser() {
  try {
    const response = await axios.get(
          "http://localhost:4040/user/checkToken", 
      { withCredentials: true }
    );

  
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

  const AddtoWishlist = (productId) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  console.log(Cart);
  
  return (
  <UserContext.Provider
  value={{
    Cart,
    setCart,
    wishlistIds,
    setUser,
    loading,
    setLoading,
    user,
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
    currentUser
  }}
>
  <Header />
  <Outlet />
</UserContext.Provider>

  );
}

export default First;
