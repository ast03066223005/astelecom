
import { Carousel } from "flowbite-react";
import itemsData from "../../../config/itemsData";

function CarouselSection() {
  // Get featured products from itemsData
  const featuredProducts = itemsData.filter(product => product.featured).slice(0, 3);
  console.log(featuredProducts, "fp")

  return (
    <div className="w-full container mx-auto px-4 py-1 h-[84vh]">
      <div className="h-full">
        <Carousel slideInterval={5000} className="rounded-lg shadow-lg">
          {featuredProducts.map((product, index) => (
            <div key={product.product_id} className="relative h-full">
              <img 
                src={product.product_feature_img} 
                alt={product.title} 
                className="w-full h-full object-cover rounded-lg md:blur-sm"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="w-[40%] h-full flex justify-center items-center ">

              <img 
                src={product.product_feature_img} 
                alt={product.title} 
                className="w-auto h-auto object-cover rounded-lg hidden md:block mx-2 scale-[0.9]"
              />
                </div>
                <div className="text-center text-white max-w-2xl px-6">
                  <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
                  <p className="text-xl mb-4">{product.description}</p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                   
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.discount_percentage}% OFF
                    </span>
                  </div>
               
                  <button className="bg-white hover:bg-primary hover:text-white text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                    Shop Now
                  </button>
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