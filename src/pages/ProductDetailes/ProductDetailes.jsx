import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import ImageGallery from "react-image-gallery";
import { cartContext } from "../../context/CartContext";
import { Helmet } from "react-helmet";
import { wishListContext } from "../../context/WishlistContext";

export default function ProductDetailes() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const { addProductToCart } = useContext(cartContext);
  const { addWishlist } = useContext(wishListContext);
  async function getDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
  }
  useEffect(() => {
    getDetails();
  }, []);
  let imgesItems = details?.images.map((img) => {
    return {
      original: img,
      thumbnail: img,
    };
  });
  return (
    <>
      {details ? (
        <>
          <Helmet>
            <title>{details.title}</title>
          </Helmet>
          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-3 shadow-lg rounded overflow-hidden bg-white">
              <ImageGallery
                items={imgesItems}
                showNav={false}
                showPlayButton={false}
              />
            </div>
            <div className="col-span-9 shadow-lg  rounded p-4 bg-white">
              <div className=" flex justify-between items-center">
                <h2 className="text-3xl font-bold capitalize">
                  {details.title}
                </h2>
                <div
                  onClick={() => {
                    addWishlist(details.id);
                  }}
                  className=" hover:scale-110 transition-all duration-300  w-10 h-10 rounded-full bg-main flex items-center justify-center cursor-pointer text-white"
                >
                  <i className="fa-solid fa-heart hover:rotate-6 transtion-all duration-300 text-white"></i>
                </div>
              </div>
              <p className="text-main font-semibold capitalize">
                {details.category.name}
              </p>
              <p className=" text-gray-500 mt-4">{details.description}</p>
              <p className="mt-4">
                <span className="font-bold text-main">Brand : </span>
                {details.brand.name}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold">
                  {details.price} <span className="text-main">L.E</span>
                </span>
                <div className="flex items-center gap-1 ">
                  <i className="fa-solid fa-star text-yellow-500"></i>
                  <span>{details.ratingsAverage}</span>
                </div>
              </div>
              <button
                onClick={() => addProductToCart(details.id)}
                className="btn w-full mt-4"
              >
                {" "}
                add to cart
              </button>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
