import ProductCard from "./../../Components/ProductCard/ProductCard";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
export default function Home() {
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
        <title>Fresh Cart | Home</title>
      </Helmet>
      <HomeSlider />
      <CategorySlider />
      <div className="grid grid-cols-12 gap-4">
        {data?.data?.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
