import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import Breadcrumb from '../components/Breadcrumb';
import SkeletonSingleProduct from '../skeletonPages/SkeletonSingleProduct'
import LoadingBar from '../components/LoadingBar';
import ProductDetails from '../components/ProductDetails';

function SingleProduct() {
  const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleProduct(id);
    }
  }, [id, getSingleProduct]);
  
  // Get the product from singleProduct (which should be a single object, not an array)
  const correctProduct = singleProduct || {};
  
  // Debug logging
  console.log('SingleProduct - ID:', id);
  console.log('SingleProduct - correctProduct:', correctProduct);
  console.log('SingleProduct - isSingleLoading:', isSingleLoading);

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
          <a href="/shop" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Shop
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto transition-all ease-linear duration-300 overflow-x-hidden">
        <div className="p-4 flex flex-col items-start">
          {/* breadcrumb_navigation  */}
          <Breadcrumb 
            link_1={"/"} 
            text_1="Home"  
            text_2={correctProduct.title} 
          />
        </div>

        {/* Use the enhanced ProductDetails component */}
        <ProductDetails product={correctProduct} />
      </div>
    </>
  )
}

export default SingleProduct;