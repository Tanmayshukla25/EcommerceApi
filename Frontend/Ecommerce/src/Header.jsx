

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation,  } from "react-router-dom";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { BsPlusSquareFill } from "react-icons/bs";
import axios from "axios";

function Header() {
  // const { id } = useParams();
  const { input, setInput, Cart, wishlistIds, setCart } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUser();
  }, [location]);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4040/user/checkToken", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4040/user/logout", {}, { withCredentials: true });
      
      setUser(null); 
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
    <div className="w-full bg-gray-200 shadow-md fixed top-0 left-0 z-50">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-gray-900">
            <Link to="/" className="hover:text-blue-600">Jewellery-Shop</Link>
          </div>

          <div className="md:hidden">
            <button className="text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <input
              type="text"
              className="w-64 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500"
              placeholder="Search Products With Ecommerce"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Link to="/" className="hover:text-blue-600 text-gray-700">Home</Link>
            <Link to="/about" className="hover:text-blue-600 text-gray-700">About</Link>
            <Link to="/contact" className="hover:text-blue-600 text-gray-700">Contact</Link>
            <Link to="/blog" className="hover:text-blue-600 text-gray-700">Blog</Link>
            <Link to="/AddProductForm" className="hover:text-blue-600 text-gray-700">
                    <BsPlusSquareFill />
                </Link>


            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
              Cart
              <sup className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {Cart || 0}
              </sup>
            </Link>

            <Link to="/AddToCart" className="relative text-gray-700 hover:text-blue-600">
              <FaHeart size={20} />
              <sup className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistIds.length}
              </sup>
            </Link>

            {loading ? null : user ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600"
                title="Logout"
              >
                <LuLogOut size={23} />
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="text-gray-700 hover:text-blue-600"
                  title="Login"
                >
                  <LuLogIn size={23} />
                </button>
              </Link>
            )}
          </nav>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 space-y-4 transition-all">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
              placeholder="Search Products With Ecommerce"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex flex-col space-y-2 text-gray-700">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                Cart ({Cart || 0})
              </Link>
              <Link to="/AddToCart" onClick={() => setMenuOpen(false)}>
                Wishlist ({wishlistIds.length})
              </Link>
              {loading ? null : user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
