import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Notfound from "./pages/NotFound/Notfound";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetailes from "./pages/ProductDetailes/ProductDetailes";
import Cart from "./pages/Cart/Cart";
import CartProvider from "./context/CartContext";
import CheckOut from "./pages/CheckOut/CheckOut";
import AllOrders from "./pages/AllOrders/AllOrders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Products from "./pages/Products/Products";
import { Offline, Online } from "react-detect-offline";
import offlineImg from "./assets/images/offline.svg";
import WishListProvide from "./context/WishlistContext";
import Wishlist from "./pages/WishList/Wishlist";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import VerfiyCode from "./pages/VerfiyCode/VerfiyCode";
import NewPassword from "./pages/NewPassword/NewPassword";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/product/:id",
          element: (
            <ProtectedRoute>
              <ProductDetailes />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/forget", element: <ForgetPassword /> },
        { path: "/verfiy", element: <VerfiyCode /> },
        { path: "/newpass", element: <NewPassword /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  const myClint = new QueryClient();
  return (
    <>
      <Online>
        <QueryClientProvider client={myClint}>
          <UserContextProvider>
            <CartProvider>
              <WishListProvide>
                <RouterProvider router={routers}></RouterProvider>
                <ReactQueryDevtools />
                <Toaster />
              </WishListProvide>
            </CartProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </Online>
      <Offline>
        <div className=" container min-h-screen flex items-center justify-center ">
          <div className="flex items-center gap-4">
            <img src={offlineImg} className=" w-72" />
            <h2 className="text-3xl font-semibold">
              you are going{" "}
              <span className="text-red-500 font-extrabold">offline</span> check
              your internet conection
            </h2>
          </div>
        </div>
      </Offline>
    </>
  );
}

export default App;
