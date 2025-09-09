import React, { useState, useEffect } from 'react'
import { useProductContext } from '../../../context/ProductContext'
import { useSearchParams, useNavigate } from 'react-router-dom'
import FeaturesProductComponent from '../productComponent/FeaturesProductComponent';
import OfferTimer from '../../../components/OfferTimer';


function FeatureSection() {
    const { featureProducts, products } = useProductContext();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState(featureProducts);
    const [allProducts, setAllProducts] = useState(products);

    const offerEndTime = new Date();
    offerEndTime.setDate(offerEndTime.getDate() + 2);

    // Handle search functionality - only filter all products, keep featured products fixed
    useEffect(() => {
        const searchQuery = searchParams.get('search');
        
        // Always keep featured products fixed (no filtering)
        setFilteredProducts(featureProducts);
        
        if (searchQuery && searchQuery.trim() !== '') {
            const searchTerm = searchQuery.toLowerCase().trim();
            
            // Only filter all products based on search
            const filteredAll = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                (product.keywords && product.keywords.some(keyword => 
                    keyword.toLowerCase().includes(searchTerm)
                ))
            );
            
            setAllProducts(filteredAll);
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

        <div className="flex gap-4 flex-wrap md:grid-cols-2 md:grid lg:grid-cols-3 border-2 border-dashed p-4 justify-items-center border-gray-200 rounded-lg">
          {filteredProducts.map((curElem) => {
            return <FeaturesProductComponent key={curElem.product_id} {...curElem} />
          })}
        </div>

      </div>

      {/* All Products Section */}
      <div className="container mx-auto p-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {allProducts.map((curElem) => {
            return <FeaturesProductComponent key={curElem.product_id} {...curElem} />
          })}
        </div>

        {allProducts.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-600">No products found for "{searchQuery}"</p>
          </div>
        )}

        {/* See All Button - only show when there are search results */}
        {searchQuery && allProducts.length > 0 && (
          <div className="text-center py-6">
            <button 
              onClick={handleSeeAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 mx-auto"
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