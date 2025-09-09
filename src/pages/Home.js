import React from 'react'
import HeroSection from './pageComponents/homeCompnents/HeroSection'
import Services from './pageComponents/homeCompnents/Services'
import Trusted from './pageComponents/homeCompnents/Trusted'
import CarouselSection from './pageComponents/homeCompnents/CarouselSection'
// import NewsLetter from './pageComponents/homeCompnents/NewsLetter'

import FeaturesProduct from './pageComponents/homeCompnents/FeatureSection'


function Home() {


  return (
    <div className='w-screen pr-2  transition-all ease-linear duration-300'>
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