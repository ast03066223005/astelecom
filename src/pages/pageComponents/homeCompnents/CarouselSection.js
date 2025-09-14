
import { Carousel } from "flowbite-react";
import itemsData from "../../../config/itemsData";
import { NavLink } from "react-router-dom";
import CachedImage from "../../../components/CachedImage";

function CarouselSection() {
  // Get featured products from itemsData
  const featuredProducts = itemsData.filter(product => product.featured).slice(0, 3);

  return (
    <div className="w-full container mx-auto px-4 py-1 md:h-[84vh] h-[63.5vh]">
      <div className="h-full">
        <Carousel slideInterval={3000} className="rounded-lg shadow-lg">
          {featuredProducts.map((product, index) => (
            <div key={product.product_id} className="relative h-full">
              <CachedImage
                src={product.banner_image}
                alt={"banner image"}
                className="w-full h-full object-cover rounded-lg "
                loadingComponent={
                  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-500">Loading carousel...</div>
                  </div>
                }
                errorComponent={
                  <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <div className="text-2xl mb-2">🖼️</div>
                      <div>Image not available</div>
                    </div>
                  </div>
                }
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center flex-col md:flex-row gap-4">
                <div className="w-[30%] md:h-full h-[43%] flex justify-center items-center aspect-square">

                  <CachedImage
                    src={product.product_feature_img}
                    alt={product.title}
                    className="w-auto h-auto object-cover rounded-lg block mx-2 md:scale-[0.7] sm:scale-[0.3] scale-125 mb-4"
                    loadingComponent={
                      <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-lg hidden md:block mx-2" />
                    }
                    errorComponent={
                      <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded-lg hidden md:flex items-center justify-center mx-2">
                        <div className="text-gray-400 text-xs">❌</div>
                      </div>
                    }
                  />
                </div>
                <div className="text-center text-white max-w-2xl px-6">
                  <h2 className="md:text-4xl lg:text-5xl text-2xl font-bold md:mb-2 mb-[1px]">{product.title}</h2>
                  <div className="flex justify-center items-center">
                  <p className="md:text-xl text-xs w-full md:w-2/3  md:mb-4 mb-2">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-center gap-4 md:mb-4 mb-3">

                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                      {product.discount_percentage}% OFF
                    </span>
                  </div>
                  <NavLink to={`/product/${product.product_id}`} className="w-full flex justify-center items-center mb-2">
                    <button className="bg-white hover:bg-primary hover:text-white text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-300 text-xs md:text-sm">
                      Shop Now
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselSection;