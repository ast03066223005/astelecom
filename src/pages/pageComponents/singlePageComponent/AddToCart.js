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
          <i className="fa-brands fa-whatsapp"></i>
          Contact via WhatsApp
        </button>
      </div>
    </>
  );
};

export default AddToCart;
