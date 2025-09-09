import React, { useState } from 'react';

function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);

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
    const message = `Hi! I want to order: ${product.title} - $${product.discount_price}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.product_images?.[selectedImage] || product.product_feature_img}
              alt={product.title}
              className="w-full h-full object-cover"
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
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
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
              ${product.discount_price}
            </span>
            <span className="text-xl line-through text-gray-500">
              ${product.current_price}
            </span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {product.discount_percentage}% OFF
            </span>
          </div>

          {/* Colors */}
          {product.product_colors && product.product_colors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Available Colors:</h3>
              <div className="flex gap-2">
                {product.product_colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg border"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

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
              <p><strong>Release Date:</strong> {product.creation_date}</p>
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
              <div key={category} className=" p-2">
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
      <hr />

      {/* Specifications */}
      {product.specifications && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2  ">
            <i className="fa-solid fa-info-circle text-gray-500 text-sm"></i> Specifications
          </h2>
          <div className="p-l-2">
            <div className="space-y-3 pl-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <p key={key} className="text-gray-700">
                  <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {value}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;