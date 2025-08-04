import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import {
  FaBars,
  FaTimes,
  FaHeart,
  FaSearch,
  FaStar,
  FaGem,
  FaShoppingCart,
} from "react-icons/fa";
import { BsPlusSquareFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "./UserContext";
import instance from "./axiosConfig.js";

function Header() {
  const { input, setInput, Cart, wishlistIds, setWishlistIds, setCart } =
    useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wishlistRes, cartRes] = await Promise.all([
          instance.get("/product/wishlist/Data", { withCredentials: true }),
          instance.get("/product/cart/data", { withCredentials: true }),
        ]);

        if (wishlistRes.data?.wishlist) {
          const cleaned = wishlistRes.data.wishlist.filter(
            (item) => item?.product
          );
          setWishlistIds(cleaned.map((item) => item.product._id));
        }

        if (cartRes.data?.cart) {
          const cleaned = cartRes.data.cart.filter((item) => item?.product);
          setCart(cleaned.length);
        }
      } catch (error) {
        console.error("Error fetching cart or wishlist:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [location]);

  const handleLogout = async () => {
    try {
      await instance.post("/user/logout", {}, { withCredentials: true });
      setCart(0);
      toast.success("User Logout Successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="relative">
      <div className="w-full bg-gray-700 shadow-2xl fixed top-0 left-0 z-50 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-2 left-10 animate-pulse">
            <FaStar className="text-yellow-300 text-xs opacity-70" />
          </div>
          <div className="absolute top-6 right-20 animate-ping">
            <FaGem className="text-pink-300 text-xs opacity-60" />
          </div>
          <div className="absolute bottom-2 left-1/3 animate-pulse">
            <FaStar className="text-blue-200 text-xs opacity-50" />
          </div>
          <div className="absolute top-4 right-1/3 animate-bounce">
            <FaGem className="text-purple-200 text-xs opacity-40" />
          </div>
        </div>

        <div className="absolute inset-0 bg-opacity-10 backdrop-blur-lg"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 relative">
          <div className="flex justify-between items-center h-16">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              <Link to="/" className="flex items-center space-x-2 group">
                <FaGem className="text-yellow-300 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-serif tracking-wide">Luxe Jewels</span>
              </Link>
            </div>

            <div className="md:hidden">
              <button
                className="text-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <div
                  className={`flex items-center bg-opacity-20 backdrop-blur-sm rounded-full border border-white px-4 py-2 transition-all duration-300 ${
                    isSearchFocused ? "bg-opacity-30 scale-105 shadow-lg" : ""
                  }`}
                >
                  <FaSearch className="text-white text-sm mr-3" />
                  <input
                    type="text"
                    className="bg-transparent text-white placeholder-gray-200 focus:outline-none w-64"
                    placeholder="Search luxury jewelry..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {["/", "/about", "/contact", "/blog"].map((path, i) => (
                  <Link
                    key={path}
                    to={path}
                    className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium relative group"
                  >
                    {["Home", "About", "Contact", "Blog"][i]}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
                {!loading && user?.role === "admin" && (
                  <Link
                    to="/AddProductForm"
                    className="text-white hover:text-green-300 transition-all duration-300 bg-gray-500 bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 hover:scale-110"
                    title="Add Product"
                  >
                    <BsPlusSquareFill size={18} />
                  </Link>
                )}

                <Link to="/cart" className="relative text-white group">
                  <div className="bg-opacity-20 backdrop-blur-sm p-2 rounded-full group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300">
                    <FaShoppingCart size={18} />
                  </div>
                  {Cart > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
                      {Cart}
                    </span>
                  )}
                </Link>

                <Link to="/Wishlist" className="relative text-white group">
                  <div className="bg-opacity-20 backdrop-blur-sm p-2 rounded-full group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300">
                    <FaHeart size={18} className="group-hover:text-red-400" />
                  </div>
                  {wishlistIds.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
                      {wishlistIds.length}
                    </span>
                  )}
                </Link>

                {loading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                ) : user ? (
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-red-300 transition-all duration-300 bg-red-600 bg-opacity-30 p-2 rounded hover:bg-opacity-50 hover:scale-110"
                    title="Logout"
                  >
                    <LuLogOut size={18} />
                  </button>
                ) : (
                  <Link to="/login">
                    <button
                      className="text-white hover:text-blue-300 transition-all duration-300 bg-blue-600 bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 hover:scale-110"
                      title="Login"
                    >
                      <LuLogIn size={18} />
                    </button>
                  </Link>
                )}
              </div>
            </nav>
          </div>

       
          <div
            className={`md:hidden transition-all duration-500 ease-in-out ${
              menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="mt-4 space-y-4 bg-opacity-10 backdrop-blur-lg rounded-2xl p-6">
              <div className="relative">
                <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-3">
                  <FaSearch className="text-white text-sm mr-3" />
                  <input
                    type="text"
                    className="bg-transparent text-white placeholder-gray-200 focus:outline-none w-full"
                    placeholder="Search luxury jewelry..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-4 text-white">
                {["/", "/about", "/contact", "/blog"].map((path, i) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-yellow-300 transition-colors duration-300 py-2 border-b border-white border-opacity-20"
                  >
                    {["Home", "About", "Contact", "Blog"][i]}
                  </Link>
                ))}

                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2 hover:text-pink-300 border-b border-white py-2 border-opacity-20"
                >
                  <FaShoppingCart />
                  <span>Cart ({Cart})</span>
                </Link>

                <Link
                  to="/Wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2 hover:text-red-300 border-b border-white py-2 border-opacity-20"
                >
                  <FaHeart />
                  <span>Wishlist ({wishlistIds.length})</span>
                </Link>

                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                ) : user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-300 hover:text-red-100 transition-colors duration-300 py-2"
                  >
                    <LuLogOut />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center space-x-2 text-blue-300 hover:text-blue-100 transition-colors duration-300 py-2"
                  >
                    <LuLogIn />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-60"></div>
      </div>

      <div className="h-20"></div>
    </div>
  );
}

export default Header;
