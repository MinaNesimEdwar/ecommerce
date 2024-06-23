import { createContext, useContext, useState } from "react";
import { userContext } from "./UserContext";
import axios from "axios";
import toast from "react-hot-toast";

export const wishListContext = createContext();
export default function WishListProvide({ children }) {
  const { token } = useContext(userContext);
  const [wishListInfo, setWishListInfo] = useState(null);
  // const [status, setStatus] = useState(false);
  async function getWishlist() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      setWishListInfo(data.data);
      console.log(wishListInfo)
      
    } catch (error) {
      console.log(error);
    }
  }
  async function addWishlist(id) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      const wishId = toast.loading("Waiting...");
      const { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(wishId);
      toast.success("Product Added Successfuly ");
    } catch (error) {
      console.log(error);
    }
  }
  async function delteProductFromWishList(id) {
    let toastId;
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      toastId = toast.loading("Waitting....");
      let { data } = await axios.request(options);
      toast.dismiss(toastId);
      toast.success("Product Removed Successfuly ");
      getWishlist();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <wishListContext.Provider
      value={{
        addWishlist,
        getWishlist,
        wishListInfo,
        delteProductFromWishList,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
