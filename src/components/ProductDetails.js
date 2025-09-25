import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CachedImage from './CachedImage';
import { useProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';
import { preloadImages } from '../utils/imageCache';
import ImgSvg from './ImgSvg';
import { whatsappNumber, whatsappMessage, currency } from '../config/constants';

function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(1);
  const [latestProducts, setLatestProducts] = useState([]);
  const { products } = useProductContext();
  const navigate = useNavigate();

  // Memoize the latest products calculation
  const latestProductsMemo = useMemo(() => {
    if (!products || products.length === 0 || !product.product_id) {
      return [];
    }

    // Filter out current product and get random 3 products
    const otherProducts = products.filter(p => p.product_id !== product.product_id);

    if (otherProducts.length === 0) {
      return [];
    }

    // Use Fisher-Yates shuffle for better randomness
    const shuffled = [...otherProducts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 3);
  }, [products, product.product_id]);

  // Update latest products when memoized value changes
  useEffect(() => {
    setLatestProducts(latestProductsMemo);
    
    // Preload latest products images in background
    if (latestProductsMemo.length > 0) {
      const latestProductImages = latestProductsMemo
        .map(p => p.product_feature_img)
        .filter(Boolean);

      if (latestProductImages.length > 0) {
        setTimeout(() => {
          preloadImages(latestProductImages, 'low');
        }, 2000); // 2 second delay to not interfere with main product loading
      }
    }
    
    setSelectedImage(1);
  }, [latestProductsMemo]);

  const renderStars = useCallback((rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      ></i>
    ));
  }, []);

  const handleWhatsAppOrder = useCallback(() => {
    const message = whatsappMessage(product);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [product.title, product.discount_price]);

  if (!product || !product.product_id) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 md:py-2 pb-2">
      <div className="grid grid-cols-[auto] lg:grid-cols-2 gap-2 md:gap-8">
        {/* Product Images */}
        <div className="space-y-4 flex flex-row md:flex-col justify-between md:justify-center md:items-center items-start gap-2">
          <div className="aspect-square rounded-lg overflow-hidden h-auto md:h-[480px] w-[100%] flex-1">
            <CachedImage
              src={product.product_images?.[selectedImage] || product.product_images[1]}
              alt={product.title}
              className="w-full object-cover drop-shadow-md shadow-primary h-full"
              loadingComponent={
                <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500">
                    <ImgSvg className="w-20 h-20" />
                  </div>
                </div>
              }
              errorComponent={
                <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-2xl mb-2">
                      <ImgSvg className="w-20 h-20" />
                    </div>
                    <div>Image not available</div>
                  </div>
                </div>
              }
            />
          </div>
          {product.product_images && product.product_images.length > 1 && (
            <div className="hidden md:grid md:grid-cols-4 grid-cols-1 grid-rows-2 md:grid-rows-1 gap-2" style={{ marginTop: '0px' }}>
              {product.product_images.slice(1, 3).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index + 1)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 h-[10vh] md:h-full w-[10vh] md:w-full ${selectedImage === index + 1 ? 'border-primary' : 'border-gray-200'
                    }`}
                >
                  <CachedImage
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover drop-shadow-sm"
                    loadingComponent={
                      <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="text-gray-400 text-xs">
                          <ImgSvg className="w-32 h-32" />
                        </div>
                      </div>
                    }
                    errorComponent={
                      <div className="w-full h-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                        <div className="text-gray-400 text-xs">
                          <ImgSvg className="w-32 h-32" />
                        </div>
                      </div>
                    }
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="md:space-y-4 space-y-1">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 md:mb-2">
              <b>{product.title}</b>
            </h1>
            <p className="sr-only">{product.sr_only_description}</p>
            <p className="text-gray-600 text-lg" style={{ lineHeight: '1.3' }}>{product.description}</p>
          </div>

            < div className="flex items-center gap-2">
                <div className="flex">{renderStars(product?.ratings)}</div>
              {product?.reviews && (
                <span className="text-gray-600">({product?.reviews} reviews)</span>
              )}
            </div>


          {/* Price */}
          <div className="flex items-center md:gap-4 gap-3">
            {
              product?.discount_price && (
                <span className="text-3xl font-bold text-green-600">
                  {currency}{product?.discount_price}
                </span>
              )}
            {
              product?.current_price && (
                <span className="text-xl line-through text-gray-500">
                  {currency}{product?.current_price}
                </span>
              )}
            {
              product?.discount_percentage && (
                <span className="bg-red-500 text-white md:px-3 px-2 py-1 rounded-full text-xs md:text-sm font-bold">
                  {product?.discount_percentage}% OFF
                </span>
              )
            }
          </div>


          {/* Stock */}
          {product?.product_stock && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Stock:</span>
              <span className={`font-semibold ${product.product_stock > 50 ? 'text-green-600' : 'text-red-600'}`}>
                {product.product_stock} available
              </span>
            </div>
          )}

          {/* WhatsApp Order Button */}
          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
           {product?.product_stock > 0 ? "Order via WhatsApp" : "Pre Order via WhatsApp"}
          </button>

          {/* Product Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Product Information</h3>
            <div className="space-y-2 text-sm pl-2">
              <p><strong>Category:</strong> {product?.category ? product?.category : "Electronics"}</p>
              <p><strong>Made in:</strong> {product?.made_country ? product?.made_country : "China"}</p>
              <p><strong>SKU:</strong> #{product?.product_id ? product?.product_id : "N/A"}</p>
            </div>
          </div>

          {/* Keywords */}
          {product?.keywords && product?.keywords?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product?.keywords?.map((keyword, index) => (
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
      {
        product?.detailed_features && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
            <hr />
            <div className="space-y-6">
              {Object.entries(product?.detailed_features).map(([category, features]) => (
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
        )
      }

      {/* Show a horizontal rule if either specs or specifications exist */}
      {(product?.specs || product?.specifications) ? <hr className='mt-8' /> : null}

      {/* Specifications (from either 'specs' or 'specifications') */}
      {
        (product?.specs || product?.specifications) && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-info-circle text-gray-900 text-sm"></i> Specifications
            </h2>
            <div className="p-l-2">
              <div className="space-y-3 pl-2">
                {Object.entries(product?.specs ? product?.specs : product?.specifications).map(([key, value]) => (
                  <p key={key} className="text-gray-700">
                    <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* Latest Products Section */}
      {
        latestProducts?.length > 0 && (
          <div className="md:mt-16 mt-8" id="store">
            <hr className="mb-8" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Latest Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestProducts?.map((latestProduct) => (
                <ProductCard
                  key={latestProduct.product_id}
                  {...latestProduct}
                  loading="lazy"
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
        )
      }
    </section >
  );
}

export default memo(ProductDetails);