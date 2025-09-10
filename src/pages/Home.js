import React, { useEffect } from 'react'
import Trusted from './pageComponents/homeCompnents/Trusted'
import CarouselSection from './pageComponents/homeCompnents/CarouselSection'
import FeaturesProduct from './pageComponents/homeCompnents/FeatureSection'
import { useProductContext } from '../context/ProductContext'
import { preloadImages } from '../utils/imageCache'

function Home() {
  const { featureProducts, products } = useProductContext();

  // Smart preloading strategy - only preload critical images
  useEffect(() => {
    const preloadCriticalImages = async () => {
      try {
        // Only preload carousel images (most critical)
        const carouselImageUrls = featureProducts
          .slice(0, 3) // Only first 3 carousel images
          .map(product => product.product_feature_img)
          .filter(Boolean);

        if (carouselImageUrls.length > 0) {
          if (process.env.NODE_ENV === 'development') {
            console.log('Preloading carousel images only...');
          }
          // Preload carousel images immediately with high priority
          await preloadImages(carouselImageUrls, 'high');
          
          // Preload first 3 product images after a delay (non-blocking)
          setTimeout(async () => {
            const productImageUrls = products
              .slice(0, 3) // Only first 3 products
              .map(product => product.product_feature_img)
              .filter(Boolean);
            
            if (productImageUrls.length > 0) {
              await preloadImages(productImageUrls, 'low');
              if (process.env.NODE_ENV === 'development') {
                console.log('Product images preloaded in background');
              }
            }
          }, 1000); // 1 second delay
          
          if (process.env.NODE_ENV === 'development') {
            console.log('Carousel images preloaded successfully');
          }
        }
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      }
    };

    // Only preload if we have data
    if (featureProducts.length > 0) {
      preloadCriticalImages();
    }
  }, [featureProducts]); // Removed products dependency to prevent unnecessary re-runs

  return (
    <div className='w-screen pr-2  transition-all ease-linear duration-300 bg-gray-100'>
      <CarouselSection />

      <div className='bg-white mt-4'>
      <Trusted />
      </div>

      <FeaturesProduct />
    </div>
  )
}

export default Home