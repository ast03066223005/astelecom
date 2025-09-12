import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import Breadcrumb from '../components/Breadcrumb';
import SkeletonSingleProduct from '../skeletonPages/SkeletonSingleProduct'
import LoadingBar from '../components/LoadingBar';
import ProductDetails from '../components/ProductDetails';
import FeaturesProductComponent from './pageComponents/productComponent/FeaturesProductComponent';
import { preloadImages } from '../utils/imageCache';

function SingleProduct() {
  const { getSingleProduct, isSingleLoading, singleProduct, products } = useProductContext();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (id) {
      getSingleProduct(id);
      // Scroll to top when product changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, getSingleProduct]);

  // Smart preloading for product images
  useEffect(() => {
    const preloadProductImages = async () => {
      if (singleProduct && singleProduct.product_id) {
        try {
          // First, preload main product image immediately
          if (singleProduct.product_feature_img) {
            if (process.env.NODE_ENV === 'development') {
              console.log('Preloading main product image...');
            }
            await preloadImages([singleProduct.product_feature_img], 'high');
          }
          
          // Then preload gallery images in background (non-blocking)
          if (singleProduct.product_images && Array.isArray(singleProduct.product_images)) {
            setTimeout(async () => {
              await preloadImages(singleProduct.product_images, 'low');
              if (process.env.NODE_ENV === 'development') {
                console.log('Gallery images preloaded in background');
              }
            }, 500); // 0.5 second delay
          }
          
          if (process.env.NODE_ENV === 'development') {
            console.log('Main product image preloaded successfully');
          }
        } catch (error) {
          console.warn('Some product images failed to preload:', error);
        }
      }
    };

    preloadProductImages();
  }, [singleProduct]);

  // Handle search functionality on product page
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    
    if (searchQuery && searchQuery.trim() !== '') {
      const searchTerm = searchQuery.toLowerCase().trim();
      
      // Filter products based on search term
      const filteredProducts = products.filter(product => {
        const searchableText = [
          product.title,
          product.description,
          product.category,
          ...(product.keywords || [])
        ].join(' ').toLowerCase();
        
        return searchableText.includes(searchTerm);
      });
      
      setSearchResults(filteredProducts);
      setShowSearchResults(true);
      
      // Scroll to top when search is performed
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
      // Debug logging in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Product page search term:', searchTerm);
        console.log('Search results:', filteredProducts.length);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  }, [searchParams, products]);
  
  // Get the product from singleProduct (which should be a single object, not an array)
  const correctProduct = singleProduct || {};
  
  // Debug logging (only in development and only when values change)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('SingleProduct - ID:', id);
      console.log('SingleProduct - correctProduct:', correctProduct);
      console.log('SingleProduct - isSingleLoading:', isSingleLoading);
    }
  }, [id, correctProduct, isSingleLoading]);

  if (isSingleLoading) {
    return (
      <>
      <LoadingBar />
    <SkeletonSingleProduct />
      </>
  )
  }

  // Handle case when product is not found
  if (!correctProduct || !correctProduct.product_id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <a href="/shop" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-hover transition-colors">
            Back to Shop
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto transition-all ease-linear duration-300 overflow-x-hidden">
        <div className="md:p-4 px-4 py-2 flex flex-col items-start">
          {/* breadcrumb_navigation  */}
          <Breadcrumb 
            link_1={"/"} 
            text_1="Home"  
            text_2={showSearchResults ? `Search Results for "${searchParams.get('search')}"` : correctProduct.title} 
          />
        </div>

        {/* Show search results if search is active */}
        {showSearchResults ? (
          <div className="px-4 py-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Search Results for "{searchParams.get('search')}" ({searchResults.length} found)
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <FeaturesProductComponent 
                    key={product.product_id} 
                    {...product} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
                  <i className="fa-solid fa-search text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-600 text-lg mb-2">No products found for</p>
                  <p className="text-gray-800 font-semibold">"{searchParams.get('search')}"</p>
                  <p className="text-gray-500 text-sm mt-2">Try searching with different keywords</p>
                </div>
              </div>
            )}
            
            {/* Back to Product Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setShowSearchResults(false);
                  // Remove search parameter from URL
                  const newUrl = window.location.pathname;
                  window.history.replaceState({}, '', newUrl);
                  // Scroll to top when going back to product
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 mx-auto"
              >
                <i className="fa-solid fa-arrow-left"></i>
                Back to Product
              </button>
            </div>
          </div>
        ) : (
          /* Show product details if no search */
          <ProductDetails product={correctProduct} />
        )}
      </div>
    </>
  )
}

export default SingleProduct;