import React from "react";

const AddToCart = ({ initialStock, country, product, product_id, mainImg, title }) => {
  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in this product: ${title}. Can you provide more information?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };



  return (
    <>
      <div className="py-2 lg:py4">
        <hr />
      </div>
      <div className="country-and-stock flex items-center justify-between">
        <div className="country-label text-sm flex item justify-end">
          <p>Made in <span className="text-gray-500">{country}</span></p>
        </div>
        <div className="total-stock text-sm py-2">
          Available: <i>{initialStock}</i>
          <span className="text-xs text-gray-500">{initialStock > 0 ? " Items In Stock" : "Out of Stock"}</span>
        </div>
      </div>
      <div className="py-2 lg:py4">
        <hr />
      </div>
      <div className="btns pt-2 lg:py-4 flex gap-2 md:flex-row flex-col justify-between items-center">
        <button
          className="text-white w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary active:bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
          onClick={handleWhatsAppContact}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm-40-534h80v-80h-80v80Zm0 120h80v-200h-80v200Zm40 100q-50 0-85-35t-35-85h80q0 17 11.5 28.5T480-360q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400h-80q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z"/>
          </svg>
          Contact via WhatsApp
        </button>
      </div>
    </>
  );
};

export default AddToCart;
