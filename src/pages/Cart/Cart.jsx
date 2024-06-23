import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Cart() {
  const {
    getCartItems,
    cartItems,
    delteProductFromCart,
    updateCount,
    clearCart,
  } = useContext(cartContext);
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartItems === null ? (
        <Loading />
      ) : (
        <div className=" bg-slate-100  p-5 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-2">
            shop cart
            <i className="fa-solid fa-cart-shopping text-main ml-2"></i>
          </h2>
          {cartItems.length === 0 ? (
            <div className="py-16 flex items-center justify-center flex-col bg-white rounded shadow-md">
              <h3 className=" capitalize font-semibold mb-2">
                there are not items yet
              </h3>
              <Link to="/" className="btn py-2">
                {" "}
                add your first product to cart
              </Link>
            </div>
          ) : (
            cartItems.data.products.map((product) => (
              <div
                className="grid grid-cols-12 my-4 gap-4 bg-white p-4 rounded shadow-md"
                key={product._id}
              >
                <div className="col-span-1 rounded overflow-hidden">
                  <img src={product.product.imageCover} className="w-full" />
                </div>
                <div className="col-span-11 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {product.product.title}
                    </h3>
                    <p className="font-semibold my-2">
                      <span className="text-main">Price : </span>
                      {product.price} L.E
                    </p>
                    <button
                      onClick={() => delteProductFromCart(product.product.id)}
                      className="btn bg-red-600 hover:bg-red-700"
                    >
                      <i className="fa-regular fa-trash-can"></i> delete
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateCount({
                          id: product.product.id,
                          count: product.count + 1,
                        })
                      }
                      className="btn"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <span className="text-lg font-semibold">
                      {product.count}
                    </span>
                    <button
                      onClick={() =>
                        updateCount({
                          id: product.product.id,
                          count: product.count - 1,
                        })
                      }
                      className="btn  bg-red-600 hover:bg-red-700"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {cartItems.length === 0 ? (
            ""
          ) : (
            <button
              onClick={() => clearCart()}
              className="btn bg-red-600 hover:bg-red-700 py-2 block ms-auto shadow-md"
            >
              <i className="fa-regular fa-trash-can"></i> clear cart
            </button>
          )}
        </div>
      )}
      <Link to="/checkout" className="btn block ms-auto mt-4 w-fit">
        next step <i className="fa-regular fa-circle-right"></i>
      </Link>
    </>
  );
}
