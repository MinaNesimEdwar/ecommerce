import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { userContext } from "./../../context/UserContext";
import { cartContext } from "./../../context/CartContext";
export default function Navbar() {
  const { token, logout } = useContext(userContext);
  const { getCartItems, cartItems } = useContext(cartContext);
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <>
      <nav className="p-4 bg-slate-100 fixed top-0 left-0 right-0 z-50">
        <div className="container  flex gap-8 items-center">
          <h1>
            <NavLink to="/">
              <img src={logo} />
            </NavLink>
          </h1>
          {token ? (
            <ul className="flex gap-4">
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] before:absolute  before:left-0 before:-bottom-2 before:bg-main hover:before:w-full before:transition-all before:duration-300 hover:font-bold ${
                      isActive ? " before:w-full font-bold" : " before:w-0"
                    }`;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] before:absolute  before:left-0 before:-bottom-2 before:bg-main hover:before:w-full before:transition-all before:duration-300 hover:font-bold ${
                      isActive ? " before:w-full font-bold" : " before:w-0"
                    }`;
                  }}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] before:absolute  before:left-0 before:-bottom-2 before:bg-main hover:before:w-full before:transition-all before:duration-300 hover:font-bold ${
                      isActive ? " before:w-full font-bold" : " before:w-0"
                    }`;
                  }}
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] before:absolute  before:left-0 before:-bottom-2 before:bg-main hover:before:w-full before:transition-all before:duration-300 hover:font-bold ${
                      isActive ? " before:w-full font-bold" : " before:w-0"
                    }`;
                  }}
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] before:absolute  before:left-0 before:-bottom-2 before:bg-main hover:before:w-full before:transition-all before:duration-300 hover:font-bold ${
                      isActive ? " before:w-full font-bold" : " before:w-0"
                    }`;
                  }}
                  to="/wishlist"
                >
                  WishList
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] before:absolute  before:left-0 before:-bottom-2 before:bg-main hover:before:w-full before:transition-all before:duration-300 hover:font-bold ${
                      isActive ? " before:w-full font-bold" : " before:w-0"
                    }`;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}
          {token ? (
            <Link to="/cart" className="ms-auto relative">
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              <span className="bg-main w-6 h-6 rounded-full text-white absolute top-0 right-0 flex items-center justify-center translate-x-1/2 -translate-y-1/2">
                {cartItems === null ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  cartItems.numOfCartItems||0
                )}
              </span>
            </Link>
          ) : (
            ""
          )}

          <ul className="flex gap-4 ">
            <li>
              <a href="https://www.facebook.com">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>

          <ul className="flex gap-4">
            {!token ? (
              <>
                {" "}
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] before:absolute  before:left-0 before:-bottom-2 before:bg-main hover:before:w-full before:transition-all before:duration-300 hover:font-bold ${
                        isActive ? " before:w-full font-bold" : " before:w-0"
                      }`;
                    }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] before:absolute  before:left-0 before:-bottom-2 before:bg-main hover:before:w-full before:transition-all before:duration-300 hover:font-bold ${
                        isActive ? " before:w-full font-bold" : " before:w-0"
                      }`;
                    }}
                    to="/register"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <span onClick={logout} className=" cursor-pointer">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
