import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function Categories() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <h2 className=" text-3xl font-extrabold mb-4">All Categories :</h2>
      <div className="grid grid-cols-12 gap-4">
        {data.data.data.map((categ) => (
          <CategoryCard categInfo={categ} key={categ._id} />
        ))}
      </div>
    </>
  );
}
