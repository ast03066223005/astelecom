
import { Carousel } from "flowbite-react";
import itemsData from "../../../config/itemsData";

function CarouselSection() {
  // Get featured products from itemsData
  const featuredProducts = itemsData.filter(product => product.featured).slice(0, 5);

  return (
    <div className="w-full container mx-auto px-4 py-8 h-[80vh]">
      <div className="h-full">
        <Carousel slideInterval={5000} className="rounded-lg shadow-lg">
          {featuredProducts.map((product, index) => (
            <div key={product.product_id} className="relative h-full">
              <img 
                src={product.product_feature_img} 
                alt={product.title} 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white max-w-2xl px-6">
                  <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
                  <p className="text-xl mb-4">{product.description}</p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-3xl font-bold text-green-400">
                      ${product.discount_price}
                    </span>
                    <span className="text-xl line-through text-gray-300">
                      ${product.current_price}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.discount_percentage}% OFF
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.ratings) ? 'text-yellow-400' : 'text-gray-400'}`}></i>
                      ))}
                    </div>
                    <span className="text-gray-300">({product.reviews} reviews)</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
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