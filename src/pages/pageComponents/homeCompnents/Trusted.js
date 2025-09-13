import React from 'react';
import AutoScrolling from '../../../components/AutoScrolling';

function Trusted() {
  // Brand icons
  const brands = [
    "fa-brands fa-apple hover:text-black",
    "fa-brands fa-microsoft hover:text-blue-500",
    "fa-brands fa-tiktok hover:text-black",
    "fa-brands fa-meta hover:text-blue-500",
    "fa-brands fa-google hover:text-red-600",
    "fa-brands fa-facebook hover:text-blue-700",
    "fa-brands fa-instagram hover:text-pink-500",
    "fa-brands fa-linkedin hover:text-sky-600",
    "fa-brands fa-amazon hover:text-black",
    "fa-brands fa-youtube hover:text-red-600",
    "fa-brands fa-twitter hover:text-blue-500",
    "fa-brands fa-reddit hover:text-orange-500",
    "fa-brands fa-pinterest hover:text-red-500",
    "fa-brands fa-snapchat hover:text-yellow-300",
    "fa-brands fa-skype hover:text-sky-600",
    "fa-brands fa-vine hover:text-green-600",
    "fa-brands fa-whatsapp hover:text-green-500",
  ];

  return (
    <div className="brands-log overflow-hidden mx-auto 2xl:container w-full">
      <div className="heading text-center py-4 md:py-8 font-extrabold text-2xl md:text-4xl text-gray-300 flex-wrap flex justify-center items-center">
        <p className='max-w-2xl md:w-full"'>
      Brands Whose Customers Trust Us
        </p>
      </div>
      <div className="relative w-full h-24 trust-list">
        <AutoScrolling
          items={brands}
          speed={0.7}
          direction="horizontal"
          repeatCount={4}
          className="brands-container"
          itemClassName="h-20 space-x-8 md:space-x-12 text-4xl md:text-7xl text-gray-700 gap-8 md:gap-20"
          containerClassName="h-20"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
}

export default Trusted;
