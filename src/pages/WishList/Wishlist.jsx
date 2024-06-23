import { useContext, useEffect } from "react";
import { wishListContext } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { cartContext } from "../../context/CartContext";
export default function Wishlist() {
  const { getWishlist, wishListInfo ,delteProductFromWishList } = useContext(wishListContext);
  const {addProductToCart}=useContext(cartContext)
  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      {wishListInfo === null ? (
        <Loading />
      ) : (
        <section className="bg-slate-100 rounded-md shadow-md p-4 ">
          <h2 className="text-2xl font-bold mb-2">
            WishList
            <i className="fa-solid fa-heart text-red-500 ml-2"></i>
          </h2>
          {wishListInfo.length === 0 ? (
            <div className="py-16 flex items-center justify-center flex-col bg-white rounded shadow-md">
              <h3 className=" capitalize font-semibold mb-2">
                there are not items yet
              </h3>
              <Link to="/" className="btn py-2">
                {" "}
                add your first product to Wishlist
              </Link>
            </div>
          ) : (
            <>
              {wishListInfo.map((item) => (
                <div key={item.id} className=" grid grid-cols-12 gap-4 my-4 bg-white rounded-md shadow-md p-4">
                  <div className=" col-span-1">
                    <img src={item.imageCover} alt="" />
                  </div>
                  <div className=" col-span-11 flex justify-between items-center">
                    <div>
                      <h2 className=" text-lg font-semibold">{item.title}</h2>
                      <p className=" font-semibold my-2">{item.price} <span className="text-main">L.E</span></p>
                      <div className="flex items-center gap-1 ">
                        <i className="fa-solid fa-star text-yellow-500"></i>
                        <span>{item.ratingsAverage}</span>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => {
                        addProductToCart(item.id)
                      }} className=" btn me-2 ">
                        Add to cart <i className="fa-solid fa-plus"></i>
                      </button>
                      <button onClick={() => {
                        delteProductFromWishList(item.id);
                      }} className=" btn bg-red-500 hover:bg-red-600">
                        Remove <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      )}
    </>
  );
}
