import { useState } from "react";
import { UserContext } from "./UserContext";
import { Outlet, useParams } from "react-router-dom";
import Header from "./Header";

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
  }}
>
  <Header />
  <Outlet />
</UserContext.Provider>

  );
}

export default First;
