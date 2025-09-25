import React, { memo, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import CachedImage from './CachedImage';
import ImgSvg from './ImgSvg';
import { currency } from '../config/constants';
import StarRating from './StarRating'
const ProductCard = (curElem) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observerInstance.unobserve(entry.target); // 👈 Stops further observation
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);


  const { product_id, title, product_feature_img, product_images,
    current_price, discount_percentage, discount_price, ratings, mood, sr_only_description } = curElem;

  return (
    <div ref={cardRef} className="product-card scroll-animate zoom-in">
      <NavLink to={`/product/${product_id}`}>
        <div className="relative flex w-full md:w-full flex-col overflow-hidden bg-white hover:shadow-md group">
          <p className="sr-only">{sr_only_description}</p>
          <div className="relative mx-3 mt-3 flex h-60 xl:h-72 overflow-hidden rounded-xl justify-center">
            {/* Blurry background image */}
            {!product_images[0].includes("/ast/products/posts/") && product_feature_img && (
              <CachedImage
                src={product_images[0].includes("/ast/products/posts/") ? product_images[0] : product_feature_img}
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
              src={product_images[0].includes("/ast/products/posts/") ? product_images[0] : product_feature_img}
              alt={title}
              loading="lazy"
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                minHeight: '100px',
                minWidth: '180px',
                objectFit: 'cover',
                width: product_images[0].includes("/ast/products/posts/") ? '100%' : '180px',
                borderRadius: product_images[0].includes("/ast/products/posts/") ? '4px' : '0',
                position: 'relative',
                scale: product_images[0].includes("/ast/products/posts/") ? '1.1' : '1',
                top: product_images[0].includes("/ast/products/posts/") ? '-1px' : '0',
              }}
              loadingComponent={
                <div className="relative z-10 w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500 text-sm">
                    <ImgSvg className="w-20 h-20" />
                  </div>
                </div>
              }
              errorComponent={
                <div className="relative z-10 w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-lg mb-1">
                      <ImgSvg className="w-20 h-20" />
                    </div>
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
                <span className="text-xl lg:text-2xl text-primary">{currency}{discount_price}</span>
                <span className="text-xs lg:text-sm text-slate-700 line-through">{currency}{current_price}</span>
              </div>
              <div className="flex items-center ">
                <StarRating rating={ratings} />
              </div>
            </div>
            {/* <NavLink to={`/product/${product_id}`} className="text-white w-full flex justify-center items-center gap-2 bg-primary active:text-primary active:bg-white focus:ring-4 focus:outline-none focus:ring-teal-500  font-medium rounded-lg text-sm px-5 py-2.5">
              <i class="fa-solid fa-eye"></i>View
            </NavLink> */}

          </div>
        </div>
      </NavLink>

    </div>

  )
}

export default memo(ProductCard)