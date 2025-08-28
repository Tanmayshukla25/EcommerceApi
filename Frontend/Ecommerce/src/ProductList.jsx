import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "./axiosConfig.js";
import { UserContext } from "./UserContext.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moreProduct, setMoreProduct] = useState(true);
  const { input, user } = useContext(UserContext);

 
  const fetchAllForAdmin = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/product/all");
      setProducts(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all products for admin:", error);
      setLoading(false);
    }
  };

 
  const fetchPaginated = async () => {
    if (loading || !moreProduct) return;
    setLoading(true);
    try {
      const response = await instance.get(`/product/all?page=${page}&limit=12`);
      const newProducts = response.data;
      if (!newProducts.length) {
        setMoreProduct(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching paginated products:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user?.role === "admin") {
      fetchAllForAdmin();
    } else {
      fetchPaginated();
    }
  }, [user]);


  useEffect(() => {
    if (user?.role === "admin") return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 300 >=
        document.documentElement.offsetHeight
      ) {
        fetchPaginated();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading, user]);

  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800  py-12">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-4">
            All Products
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-pink-300 mx-auto rounded-full"></div>
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No products found.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
            >
              <Link to={`/product/${product._id}`}>
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "/placeholder.jpg"
                    }
                    alt={product.name || "Product Image"}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-300 to-pink-300 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                </div>
              </Link>

              <div className="p-5">
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-pink-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex gap-2 mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                    {product.slug}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                    {product.category}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.discountedPrice}
                    </span>
                    <span className="text-lg line-through text-gray-400">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    You save ₹{product.originalPrice - product.discountedPrice}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Stock:</span>
                    <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                      {product.quantity}
                    </span>
                  </div>

                  <Link
                    to={`/product/${product._id}`}
                    className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-yellow-400 to-pink-400 rounded-lg hover:from-yellow-500 hover:to-pink-500 transition-all duration-200 hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center mt-10 text-gray-600">
            Loading more products...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
