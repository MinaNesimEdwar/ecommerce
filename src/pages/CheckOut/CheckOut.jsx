import { useFormik } from "formik";
import { useContext, useState } from "react";
import { cartContext } from "../../context/CartContext";
import { userContext } from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function CheckOut() {
  const { cartItems, setCartItems } = useContext(cartContext);
  const { token } = useContext(userContext);
  const [type, setType] = useState("");
  const navigate = useNavigate();

  async function createOnlineOrder(values) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems.data._id}?url=https://fresh-cart-kohl.vercel.app/`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };
    let { data } = await axios.request(options);
    console.log(data);
    toast.loading("Redirect To Online Getway");
    setTimeout(() => {
      if (data.status === "success") {
        window.location.href = data.session.url;
      }
    }, 3000);
  }
  async function createCachOrder(values) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartItems.data._id}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };
    let { data } = await axios.request(options);
    console.log(data);
    setCartItems([]);
    const toastid = toast.loading("Redirect To Orders Page");
    setTimeout(() => {
      toast.dismiss(toastid);
      navigate("/allorders");
    }, 3000);
  }

  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (type === "cash") {
        createCachOrder(values);
      } else {
        createOnlineOrder(values);
      }
    },
  });
  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="City"
            className="form-control w-full"
            name="shippingAddress.city"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone"
            className="form-control w-full"
            name="shippingAddress.phone"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

        </div>
        <div>
          <textarea
            placeholder="Details"
            className="form-control w-full resize-none"
            name="shippingAddress.details"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

        </div>
        <div>
          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 mr-4"
            onClick={() => {
              setType("cash");
            }}
          >
            cash order
          </button>
          <button
            type="submit"
            className="btn"
            onClick={() => {
              setType("online");
            }}
          >
            online order
          </button>
        </div>
      </form>
    </>
  );
}
