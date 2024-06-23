import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import BrandCard from "../../Components/BrandCard/BrandCard";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function Brands() {
  async function getBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    return axios.request(options);
  }
  let { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h2 className=" text-3xl font-extrabold mb-4">All Brands :</h2>
      <div className="grid grid-cols-12 gap-4">
        {data.data.data.map((brand) => (
          <BrandCard brandInfo={brand} key={brand._id} />
        ))}
      </div>
    </>
  );
}
