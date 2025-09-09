import React from 'react';
import AutoScrolling from '../../../components/AutoScrolling';

function Trusted() {
  // Brand icons
  const brands = [
    "fa-brands fa-medapps",
    "fa-brands fa-nfc-directional",
    "fa-brands fa-mandalorian",
    "fa-brands fa-pagelines",
    "fa-brands fa-digg",
    "fa-brands fa-pied-piper-alt",
  ];

  return (
    <div className="brands-log overflow-hidden mx-auto container">
      <div className="heading text-center py-4 md:py-8 font-extrabold text-4xl text-gray-300 w-full flex justify-center">
        Trusted by 100+ Brands
      </div>
      <div className="relative w-full h-24">
        <AutoScrolling
          items={brands}
          speed={0.7}
          direction="horizontal"
          repeatCount={4}
          className="brands-container"
          itemClassName="h-20 space-x-8 md:space-x-12 text-4xl md:text-7xl text-gray-700 gap-20"
          containerClassName="h-20"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
}

export default Trusted;
