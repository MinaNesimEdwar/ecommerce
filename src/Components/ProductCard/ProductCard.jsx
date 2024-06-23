/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import { wishListContext } from "../../context/WishlistContext";

export default function ProductCard({ productInfo }) {
  const { addWishlist } = useContext(wishListContext);
  const {
    title,
    price,
    imageCover,
    category,
    ratingsAverage,
    _id,
  } = productInfo;
  let { addProductToCart } = useContext(cartContext);
  return (
    <>
      <div className="col-span-2 shadow-lg rounded overflow-hidden bg-white">
        <div className=" relative">
          <img src={imageCover} className="w-full" />
          <div className=" opacity-0 hover:opacity-100 transition-opacity duration-300 flex gap-1 justify-center items-center absolute w-full h-full bg-black bg-opacity-15 top-0 left-0">
            <div
              onClick={() => {
                addWishlist(_id);
              }}
              className=" hover:scale-110 transition-all duration-300  w-10 h-10 rounded-full bg-main flex items-center justify-center cursor-pointer text-white"
            >

                <i className="fa-solid fa-heart checked:text-red-500 hover:rotate-6 transtion-all duration-300 text-white"></i>
            </div>
            <div
              onClick={() => addProductToCart(_id)}
              className=" hover:scale-110 transition-all duration-300 w-10 h-10 rounded-full bg-main flex items-center justify-center cursor-pointer text-white"
            >
              <i className="fa-solid fa-cart-shopping  hover:rotate-6 transtion-all duration-300"></i>
            </div>
            <Link
              to={`/product/${_id}`}
              className=" hover:scale-110 transition-all duration-300 w-10 h-10 rounded-full bg-main flex items-center justify-center cursor-pointer text-white"
            >
              <i className="fa-regular fa-eye  hover:rotate-6 transtion-all duration-300"></i>
            </Link>
          </div>
        </div>
        <div className="p-2">
          <h2 className="text-sm font-bold text-main">{category.name}</h2>
          <h3 className=" font-semibold  line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between mt-4">
            <span>{price} L.E</span>
            <div className="flex items-center gap-1 ">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
