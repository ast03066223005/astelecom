import React from 'react'
import Services from './pageComponents/homeCompnents/Services'
import Trusted from './pageComponents/homeCompnents/Trusted'
import CarouselSection from './pageComponents/homeCompnents/CarouselSection'
// import NewsLetter from './pageComponents/homeCompnents/NewsLetter'

import FeaturesProduct from './pageComponents/homeCompnents/FeatureSection'


function Home() {


  return (
    <div className='w-screen pr-2  transition-all ease-linear duration-300 bg-gray-100'>
      {/* <HeroSection /> */}
      <CarouselSection />
      <Trusted />
      <Services />
      <FeaturesProduct />
      {/* <NewsLetter /> */}
    </div>
  )
}

export default Home