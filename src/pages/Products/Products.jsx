import ProductCard from "./../../Components/ProductCard/ProductCard";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
export default function Products() {
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <h2 className=" text-3xl font-extrabold mb-4">All Products :</h2>

      <div className="grid grid-cols-12 gap-4">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
