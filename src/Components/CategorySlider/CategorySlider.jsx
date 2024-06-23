import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./../Loading/Loading";
import { register } from "swiper/element/bundle";
register();
export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {categories ? (
        <section className="my-8">
          <h2 className="text-lg font-semibold">Shop Popular Categories</h2>
          <swiper-container
            style={{ height: "100%" }}
            loop={true}
            autoplay={true}
            slides-per-view={6}
          >
            {categories.map((categ) => (
              // eslint-disable-next-line react/jsx-key
              <swiper-slide key={categ._id}>
                <div className="bg-white">
                  <img src={categ.image} className="w-full h-72 object-cover " />
                  <h2 className="text-main font-semibold mt-2">{categ.name}</h2>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
