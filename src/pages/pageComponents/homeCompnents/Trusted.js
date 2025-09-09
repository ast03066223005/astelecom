import React from 'react';
import AutoScrolling from '../../../components/AutoScrolling';

function Trusted() {
  // Brand icons
  const brands = [
    "fa-brands fa-microsoft",
    "fa-brands fa-tiktok",
    "fa-brands fa-apple",
    "fa-brands fa-google",
    "fa-brands fa-amazon",
    "fa-brands fa-meta",
    "fa-brands fa-whatsapp",
  ];

  return (
    <div className="brands-log overflow-hidden mx-auto container">
      <div className="heading text-center py-4 md:py-8 font-extrabold text-4xl text-gray-300 w-full flex justify-center">
      Brands Whose Customers Trust Us
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
