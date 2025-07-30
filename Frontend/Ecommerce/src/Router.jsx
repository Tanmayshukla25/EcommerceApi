import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./First.jsx";
import Singleproject from "./Singleproject.jsx";
import About from "./About";
import Contact from "./Contact.jsx";
import Blog from "./Blog.jsx";
import Cart from "./Cart.jsx";
import Login from "./Login.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

import "./App.css"
import AddToCart from "./AddToCart.jsx";
import ProductList from "./ProductList.jsx";
import Register from "./Register.jsx";
import AddProductForm from "./AddProductForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { index: true, element: <ProductList /> },
      { path: "product/:id", element: <Singleproject /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "blog", element: <Blog /> },
      { path: "AddProductForm", element: <AddProductForm /> },


        {
        path: "AddToCart",
        element: (
          <ProtectedRoute>
       <AddToCart /> 
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
