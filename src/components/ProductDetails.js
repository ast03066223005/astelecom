import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CachedImage from './CachedImage';
import { useProductContext } from '../context/ProductContext';
import FeaturesProductComponent from '../pages/pageComponents/productComponent/FeaturesProductComponent';
import { preloadImages } from '../utils/imageCache';

function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);
  const { products } = useProductContext();
  const navigate = useNavigate();

  // Get random 3 products excluding current product
  useEffect(() => {
    if (products && products.length > 0 && product.product_id) {
      // Filter out current product and get random 3 products
      const otherProducts = products.filter(p => p.product_id !== product.product_id);
      
      if (otherProducts.length > 0) {
        // Use Fisher-Yates shuffle for better randomness
        const shuffled = [...otherProducts];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const selectedProducts = shuffled.slice(0, 3);
        setLatestProducts(selectedProducts);
        
        // Preload latest products images in background
        const latestProductImages = selectedProducts
          .map(p => p.product_feature_img)
          .filter(Boolean);
        
        if (latestProductImages.length > 0) {
          setTimeout(() => {
            preloadImages(latestProductImages, 'low');
          }, 99000); // 99 second delay to not interfere with main product loading
        }
      }
    }
  }, [products, product.product_id]);

  if (!product || !product.product_id) {
    return <div className="text-center py-8">Product not found</div>;
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i 
        key={i} 
        className={`fa-solid fa-star ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      ></i>
    ));
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I want to order: ${product.title} - $${product.discount_price} \n - ${window.location.href}`; 
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <CachedImage
              src={product.product_images?.[selectedImage] || product.product_feature_img}
              alt={product.title}
              className="w-full h-full object-cover drop-shadow-md shadow-primary"
              loadingComponent={
                <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500">Loading image...</div>
                </div>
              }
              errorComponent={
                <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-2xl mb-2">📷</div>
                    <div>Image not available</div>
                  </div>
                </div>
              }
            />
          </div>
          {product.product_images && product.product_images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.product_images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <CachedImage
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover drop-shadow-sm"
                    loadingComponent={
                      <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="text-gray-400 text-xs">Loading...</div>
                      </div>
                    }
                    errorComponent={
                      <div className="w-full h-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                        <div className="text-gray-400 text-xs">❌</div>
                      </div>
                    }
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(product.ratings)}</div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">
              Rs.{product.discount_price}
            </span>
            <span className="text-xl line-through text-gray-500">
              Rs.{product.current_price}
            </span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {product.discount_percentage}% OFF
            </span>
          </div>


          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Stock:</span>
            <span className={`font-semibold ${product.product_stock > 50 ? 'text-green-600' : 'text-red-600'}`}>
              {product.product_stock} available
            </span>
          </div>

          {/* WhatsApp Order Button */}
          <button 
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
            Order via WhatsApp
          </button>

          {/* Product Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Product Information</h3>
            <div className="space-y-2 text-sm pl-2">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Made in:</strong> {product.made_country}</p>
              <p><strong>SKU:</strong> #{product.product_id}</p>
            </div>
          </div>

          {/* Keywords */}
          {product.keywords && product.keywords.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.keywords.map((keyword, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-primary/20 text-black text-sm rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      {product.detailed_features && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
          <hr />
          <div className="space-y-6">
            {Object.entries(product.detailed_features).map(([category, features]) => (
              <div key={category} className="p-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-star text-gray-500 text-sm"></i> {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
                {typeof features === 'object' && !Array.isArray(features) ? (
                  <div className="space-y-3 pl-2">
                    {Object.entries(features).map(([key, value]) => (
                      <p key={key} className="text-gray-700">
                        <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {value}
                      </p>
                    ))}
                  </div>
                ) : Array.isArray(features) ? (
                  <ul className="list-disc list-inside space-y-2 pl-2">
                    {features.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{features}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show a horizontal rule if either specs or specifications exist */}
      {(product?.specs || product?.specifications) ? <hr /> : null}

      {/* Specifications (from either 'specs' or 'specifications') */}
      {(product.specs || product.specifications) && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-info-circle text-gray-900 text-sm"></i> Specifications
          </h2>
          <div className="p-l-2">
            <div className="space-y-3 pl-2">
              {Object.entries(product.specs ? product.specs : product.specifications).map(([key, value]) => (
                <p key={key} className="text-gray-700">
                  <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {value}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Latest Products Section */}
      {latestProducts.length > 0 && (
        <div className="mt-16" id="store">
          <hr className="mb-8" />
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Latest Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProducts.map((latestProduct) => (
              <FeaturesProductComponent 
                key={latestProduct.product_id} 
                {...latestProduct} 
              />
            ))}
          </div>
          
          {/* View All Products Button */}
          <div className="text-center mt-8" id="store">
            <button
              onClick={() => {
                navigate('/');
                // Scroll to top when navigating to home
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              <i className="fa-solid fa-list"></i>
              View All Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;