import React, { useEffect } from 'react'
import Trusted from '../components/Trusted'
import CarouselSection from '../components/CarouselSection'
import FeaturesProduct from '../components/FeatureSection'
import { useProductContext } from '../context/ProductContext'
import { preloadImages } from '../utils/imageCache'
import { Helmet } from 'react-helmet-async';

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
  }, [featureProducts, products]); // Added 'products' to dependencies to satisfy exhaustive-deps lint rule

  return (
    <div className='w-screen  transition-all ease-linear duration-300 bg-gray-100'>
      <Helmet>
        <title>AST Earbuds | Best Wireless Earbuds & Audio Accessories</title>
        <meta name="description" content="AST offers the best wireless earbuds, fast chargers, and audio accessories. Discover high-quality sound, advanced features, and affordable prices. Shop AST for your next audio upgrade!" />
        <meta name="keywords" content="AST, wireless earbuds, fast chargers, audio accessories, high-quality sound, advanced features, affordable prices" />
        <meta name="author" content="AST" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="yandexbot" content="index, follow" />
        <meta name="sitemap" content="https://astelecom.store/sitemap.xml" />
        <link rel="canonical" href="https://astelecom.store/" />
      </Helmet>
      <CarouselSection />

      <div className='bg-white mt-4'>
      <Trusted />
      </div>

      <FeaturesProduct />
    </div>
  )
}

export default Home