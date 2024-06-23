import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
export default function AllOrders() {
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);
  
  async function getOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    return axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <section className=" bg-slate-100 p-4 rounded shadow-md">
  
          <h2 className=" text-2xl font-extrabold mb-4">All Orders </h2>
        
        {data.data.map((order) => (
          <div className="bg-white p-4 shadow-md rounded mt-4" key={order._id}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className=" text-main text-xl">Order ID</h2>
                <h3 className="font-bold text-xl">#{order.id}</h3>
              </div>
              <div>
                {order.isDelivered ? (
                  <span className="bg-lime-500 inline-block py-2 px-4 rounded-3xl text-white text-lg mr-4">
                    Deliveried
                  </span>
                ) : (
                  <span className="bg-blue-500 inline-block py-2 px-4 rounded-3xl text-white text-lg mr-4">
                    Under Delivery
                  </span>
                )}
                {order.isPaid ? (
                  <span className="bg-lime-500 inline-block py-2 px-4 rounded-3xl text-white text-lg ">
                    paid
                  </span>
                ) : (
                  <span className="bg-red-500 inline-block py-2 px-4 rounded-3xl text-white text-lg ">
                    Unpaid
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-12 mt-4 gap-4">
              {order.cartItems.map((item) => (
                <div
                  className="col-span-2 bg-slate-100 rounded shadow-md overflow-hidden"
                  key={item._id}
                >
                  <img
                    src={item.product.imageCover}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-2">
                    <h2 className="font-bold line-clamp-2 ">
                      {item.product.title}
                    </h2>
                    <p>
                      ${item.price} <span className="text-main">L.E</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}







            // <div className="py-16 flex items-center justify-center flex-col bg-white rounded shadow-md">
            //   <h3 className=" capitalize font-semibold mb-2">
            //     there are not items yet
            //   </h3>
            //   <Link to="/" className="btn py-2">
            //     {" "}
            //     add your first product to cart
            //   </Link>
            // </div>