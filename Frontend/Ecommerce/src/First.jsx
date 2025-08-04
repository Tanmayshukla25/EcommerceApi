// import { useState, useEffect } from "react";
// import { UserContext } from "./UserContext";
// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import instance from "./axiosConfig.js";

// function First() {
//   const [Cart, setCart] = useState(0);
//   const [addtocartid, setAddtocartid] = useState([]);
//   const [data, setData] = useState([]);
//   const [Quantity, setQuantity] = useState(1);
//   const [wishlistIds, setWishlistIds] = useState([]);
//   const [input, setInput] = useState("");
//   const [cartItems, setCartItems] = useState([]);
//   const [user, setUser] = useState(null); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   async function fetchUser() {
//     try {
//       const response = await instance.get("/user/checkToken", {
//         withCredentials: true,
//       });

//       const userData = response.data?.User;

//       if (!userData || !userData._id) {
//         throw new Error("User not found in token response");
//       }

//       setUser({
//         _id: userData._id,
//         role: userData.role || "student", 
//       });
//     } catch (e) {
//       console.error("User fetch error:", e);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchUser();
// }, []);


//   const AddtoWishlist = (productId) => {
//     setWishlistIds((prev) => {
//       if (prev.includes(productId)) return prev;
//       return [...prev, productId];
//     });
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         Cart,
//         setCart,
//         wishlistIds,
//         setWishlistIds,
//         addtocartid,
//         setAddtocartid,
//         setCartItems,
//         cartItems,
//         data,
//         setData,
//         Quantity,
//         setQuantity,
//         AddtoWishlist,
//         input,
//         setInput,
//         user,
//         setUser,
//         loading,
//         setLoading,
//       }}
//     >
//       <Header />
//       <Outlet />
//     </UserContext.Provider>
//   );
// }

// export default First;
// First.jsx
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
    async function fetchUser() {
      try {
        const response = await instance.get("/user/checkToken", {
          withCredentials: true,
        });

        const userData = response.data?.User;

        if (!userData || !userData._id) {
          throw new Error("User not found in token response");
        }

        setUser({
          _id: userData._id,
          role: userData.role || "student",
        });
      } catch (e) {
        console.error("User fetch error:", e);
        setUser(null);
      } finally {
        setLoading(false);
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
      }}
    >
      <Header />
      <Outlet />
    </UserContext.Provider>
  );
}

export default First;
