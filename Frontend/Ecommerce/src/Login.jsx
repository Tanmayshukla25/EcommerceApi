import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import instance from "./axiosConfig.js";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import { SiTicktick } from "react-icons/si";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [failed, setFailed] = useState(false);
  const { fetchData } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("referer") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await instance.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );

      setEmail("");
      setPassword("");

      setIsLogin(true);
      setFailed(false);
      fetchData();
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-white">Login to continue shopping</p>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
          <div className="flex-1 text-center py-2 px-4 rounded-md bg-white text-blue-600 font-semibold shadow-sm">
            Sign In
          </div>
          <Link
            to="/register"
            className="flex-1 text-center py-2 px-4 rounded-md text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Register
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {isLogin && (
            <div className="flex items-center  justify-center">
              <div className=" pb-2 bg-green-600  text-center w-[220px] py-1 rounded-2xl px-2 text-white text-xl">
               <div className="flex items-center  gap-2">
                 <span><SiTicktick /></span><h1>Login Successfully</h1>
               </div>
              </div>
            </div>
          )}
          {failed && (
            <div className="flex items-center justify-center pb-2 text-red-600 text-xl">
              <h1>Login Failed</h1>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center mb-4">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-blue-700 font-medium">
                Logging in...
              </span>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transform hover:scale-105"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors duration-200"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            Protected by reCAPTCHA and subject to our Privacy Policy and Terms
            of Service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
