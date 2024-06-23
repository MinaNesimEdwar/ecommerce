import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import { register } from "swiper/element/bundle";
register();
export default function HomeSlider() {
  return (
    <section>
      <div className="grid grid-cols-12 mb-8 ">
        <div className="col-span-8">
          <swiper-container
            style={{ height: "100%" }}
            loop={true}
            autoplay={true}
          >
            <swiper-slide style={{ height: "100%" }}>
              <img src={slide1} className="w-full h-full " />
            </swiper-slide>
            <swiper-slide style={{ height: "100%" }}>
              <img src={slide2} className="w-full h-full " />
            </swiper-slide>
            <swiper-slide style={{ height: "100%" }}>
              <img src={slide3} className="w-full h-full " />
            </swiper-slide>
          </swiper-container>
        </div>
        <div className="col-span-4">
          <div className="h-1/2">
            <img src={slide3} className="w-full h-full " />
          </div>
          <div className="h-1/2">
            <img src={slide2} className="w-full h-full " />
          </div>
        </div>
      </div>
    </section>
  );
}
