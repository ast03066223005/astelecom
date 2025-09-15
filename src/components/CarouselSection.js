import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import itemsData from "../config/itemsData";
import { NavLink } from "react-router-dom";
import CachedImage from "./CachedImage";

function CarouselSection() {
  const featuredProducts = itemsData.filter(product => product.featured).slice(0, 3);

  return (
    <div className="w-full container mx-auto px-4 py-1 md:h-[84vh] sm:h-[80vh] h-[63.5vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="rounded-lg shadow-lg h-full"
        style={{ backgroundColor: "#f3f4f6", backgroundImage: `url(${featuredProducts[0].banner_image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.product_id}>
            <div className="relative h-full">
              {/* background banner */}
              {/* <CachedImage
                src={product.banner_image}
                alt="banner"
                className="w-full h-full object-cover rounded-lg"
              /> */}

              {/* overlay content */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center flex-col md:flex-row gap-4">
                {/* left product image */}
                <div className="w-[30%] md:h-full sm:h-[35%] h-[43%] flex justify-center items-center aspect-">
                  <CachedImage
                    src={product.product_feature_img}
                    alt={product.title}
                    className="w-auto h-auto object-cover rounded-lg block mx-2 md:scale-[0.7] sm:scale-[0.5] 2xl:scale-[0.8] scale-125 mb-4"
                  />
                </div>

                {/* right content */}
                <div className="text-center text-white max-w-2xl px-6 2xl:space-y-3">
                  <h2 className="md:text-4xl lg:text-5xl text-2xl font-bold md:mb-2 mb-[1px] 2xl:text-6xl">
                    {product.title}
                  </h2>
                  <div className="flex justify-center items-center">
                    <p className="md:text-xl text-xs w-full md:w-2/3 md:mb-4 mb-2 2xl:text-2xl">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4 md:mb-4 mb-3">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs md:text-sm 2xl:text-lg font-bold">
                      {product.discount_percentage}% OFF
                    </span>
                  </div>
                  <NavLink
                    to={`/product/${product.product_id}`}
                    className="w-full flex justify-center items-center mb-2"
                  >
                    <button className="bg-white hover:bg-primary hover:text-white text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-300 text-xs md:text-sm 2xl:text-xl">
                      Shop Now
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* custom pagination & nav styles */}
      <style jsx>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.6;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          background: white !important; /* red-500 */
          opacity: 1;
        }
        .swiper-button-prev,
        .swiper-button-next {
          color: white !important;
          width: 35px;
          height: 35px;
          background-color: rgba(243, 244, 246, 0.3); /* light transparent gray */
          back-drop-filter: blur(10px);
          border-radius: 50%;
          padding: 10px;
          transition: all 0.3s ease;
          margin: 0 10px;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background-color: rgba(243, 244, 246, 0.5);
          transition: all 0.3s ease;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 20px;
          font-weight: bold;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default CarouselSection;
