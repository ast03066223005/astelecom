import React, { useState, useEffect } from 'react'
import { useProductContext } from '../../../context/ProductContext'
import { useSearchParams, useNavigate } from 'react-router-dom'
import FeaturesProductComponent from '../productComponent/FeaturesProductComponent';
import OfferTimer from '../../../components/OfferTimer';
import Services from '../homeCompnents/Services';

function FeatureSection() {
  const { featureProducts, products } = useProductContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(featureProducts);
  const [allProducts, setAllProducts] = useState(products);
  const [gamingProducts, setGamingProducts] = useState([]);

  const offerEndTime = new Date();
  offerEndTime.setDate(offerEndTime.getDate() + 2);

  // Handle search functionality and gaming products filtering
  useEffect(() => {
    const searchQuery = searchParams.get('search');

    // Always keep featured products fixed (no filtering)
    setFilteredProducts(featureProducts);

    // Filter gaming products (products with mood: "Gaming")
    const gamingFiltered = products.filter(product => product.mood === "Gaming");
    setGamingProducts(gamingFiltered);

    if (searchQuery && searchQuery.trim() !== '') {
      const searchTerm = searchQuery.toLowerCase().trim();

      // Only filter all products based on search
      const filteredAll = products.filter(product => {
        // Create a comprehensive search string for each product
        const searchableText = [
          product.title,
          product.description,
          product.category,
          ...(product.keywords || [])
        ].join(' ').toLowerCase();
        
        return searchableText.includes(searchTerm);
      });

      setAllProducts(filteredAll);
      
      // Debug logging in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Search term:', searchTerm);
        console.log('Total products:', products.length);
        console.log('Filtered products:', filteredAll.length);
        console.log('Gaming products:', gamingFiltered.length);
      }
    } else {
      setAllProducts(products);
    }
  }, [searchParams, featureProducts, products]);

  const handleSeeAll = () => {
    navigate('/');
  };

  const searchQuery = searchParams.get('search');

  return (
    <>

      {/* Featured Products Section */}
      <div className="container mx-auto p-4 py-6">
        <div className="heading">
          <OfferTimer endTime={offerEndTime} />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredProducts.map((curElem) => {
            return <FeaturesProductComponent key={curElem.product_id} {...curElem} />
          })}
        </div>

      </div>
      <Services />

      {/* Gaming Products Section */}
      {gamingProducts.length > 0 && !searchQuery && (
        <div className="container mx-auto p-4 py-6  rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <i className="fa-solid fa-gamepad text-primary"></i>
              Gaming Products
            </h2>
            <p className="text-gray-600">High-performance gaming earbuds for the ultimate gaming experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {gamingProducts.map((curElem) => {
              return <FeaturesProductComponent key={curElem.product_id} {...curElem} />
            })}
          </div>
        </div>
      )}

      {/* All Products Section */}
      <div className="container mx-auto p-4 py-6" id='store'>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {searchQuery ? `Search Results for "${searchQuery}" (${allProducts.length} found)` : 'All Products'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {allProducts.map((curElem) => {
            return <FeaturesProductComponent key={curElem.product_id} {...curElem} />
          })}
        </div>

        {allProducts.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
              <i className="fa-solid fa-search text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-600 text-lg mb-2">No products found for</p>
              <p className="text-gray-800 font-semibold">"{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try searching with different keywords</p>
            </div>
          </div>
        )}

        {/* See All Button - only show when there are search results */}
        {searchQuery && allProducts.length > 0 && (
          <div className="text-center py-6">
            <button
              onClick={handleSeeAll}
              className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              <i className="fa-solid fa-list"></i>
              See All Products
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default FeatureSection