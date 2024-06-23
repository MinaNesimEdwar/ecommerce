import { createContext, useContext, useState } from "react";
import { userContext } from "./UserContext";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(null);
export default function CartProvider({ children }) {
  const { token } = useContext(userContext);
  const [cartItems, setCartItems] = useState(null);
  async function getCartItems() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.numOfCartItems === 0) {
        setCartItems([]);
      } else {
        setCartItems(data);
      }
      console.log(data);
    } catch (error) {
      if (error.response.data.message.includes("No cart")) {
        setCartItems([]);
      }
    }
  }
  
  async function delteProductFromCart(id) {
    let toastId;
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      toastId = toast.loading("Waitting....");
      let { data } = await axios.request(options);
      if (data.numOfCartItems === 0) {
        setCartItems([]);
      } else {
        setCartItems(data);
      }
      toast.dismiss(toastId);
      toast.success("Product Removed From Cart");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function addProductToCart(id) {
    let toastId;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      toastId = toast.loading("Waitting....");
      let { data } = await axios.request(options);
      setCartItems(data);
      toast.dismiss(toastId);
      toast.success("Product Added To Cart");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function clearCart() {
    let clearId;
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "DELETE",
      headers: {
        token
      }
    }
    clearId=toast.loading("Waiting...")
    let { data } = await axios.request(options);
    if (data.message === "success") {
      setCartItems([]);
      toast.dismiss(clearId)
      toast.success("Cart Cleared Successfuly")
    }
  }

  async function updateCount({ id, count }) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      method: "PUT",
      headers: {
        token,
      },
      data: {
        count,
      },
    };
    const { data } = await axios.request(options);
    setCartItems(data);
    console.log(data);
  }
  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getCartItems,
        cartItems,
        delteProductFromCart,
        updateCount,
        clearCart,
        setCartItems
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
