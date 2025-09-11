import React from 'react'
import { NavLink } from 'react-router-dom';
import CachedImage from '../../../components/CachedImage';

const FeaturesProductComponent = (curElem) => {

  const { product_id, title, product_feature_img,
    current_price, discount_percentage, discount_price, ratings, mood } = curElem;

  return (
    <>

      <NavLink to={`/product/${product_id}`}>
        <div className="relative flex w-full md:w-full flex-col overflow-hidden bg-white hover:shadow-md group">
          <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl justify-center">
            {/* Blurry background image */}
            {product_feature_img && (
              <CachedImage
                src={product_feature_img}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover filter blur-[14px] scale-110"
                aria-hidden="true"
                draggable="false"
                style={{ zIndex: 0 }}
                loadingComponent={
                  <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse" />
                }
              />
            )}
            {/* Foreground sharp image */}
            <CachedImage
              className="relative z-10 object-cover transition-all ease-linear duration-300 scale-95"
              src={product_feature_img}
              alt={title}
              loading="lazy"
              style={{ 
                maxHeight: '100%', 
                maxWidth: '100%',
                minHeight: '100px',
                minWidth: '180px'
              }}
              loadingComponent={
                <div className="relative z-10 w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500 text-sm">Loading...</div>
                </div>
              }
              errorComponent={
                <div className="relative z-10 w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-lg mb-1">📷</div>
                    <div className="text-xs">Image unavailable</div>
                  </div>
                </div>
              }
            />
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white z-20">
              {discount_percentage}% OFF
            </span>
            {mood === "Gaming" && (
              <span className="absolute top-0 right-0 m-2 rounded-full bg-primary px-2 text-center text-xs font-medium text-white z-20">
                <i className="fa-solid fa-gamepad text-white"></i> Gaming
              </span>
            )}
          </div>
          <div className="mt-4 px-5 pb-5">
              <h2 className="title text-xl tracking-tight text-slate-900 text-ellipsis overflow-hidden whitespace-nowrap">{title}</h2>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <span className="text-xl lg:text-2xl text-primary">Rs.{discount_price}</span>
                <span className="text-xs lg:text-sm text-slate-700 line-through">Rs.{current_price}</span>
              </div>
              <div className="flex items-center ">
                <div className="stars flex justify-end items-center">

                  <svg aria-hidden="true" className="h-6 w-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>

                </div>
                <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{ratings}</span>
              </div>
            </div>
            {/* <NavLink to={`/product/${product_id}`} className="text-white w-full flex justify-center items-center gap-2 bg-primary active:text-primary active:bg-white focus:ring-4 focus:outline-none focus:ring-teal-500  font-medium rounded-lg text-sm px-5 py-2.5">
              <i class="fa-solid fa-eye"></i>View
            </NavLink> */}

          </div>
        </div>
      </NavLink>

    </>

  )
}

export default FeaturesProductComponent