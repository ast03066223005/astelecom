import React from 'react'

function Services() {
    return (
        <>



            <section className="bg-primary">
                <div className=" grid px-4 py-8 container mx-auto grid-cols-auto sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">

                    <div className="p-2 flex flex-col justify-center items-center gap-2 hover:scale-105 cursor-default transition-all duration-100">
                            <i className="fa-solid fa-truck-fast font-bold text-white text-lg lg:text-2xl p-1"></i>
                        <div>
                            <h3 className="text-lg font-bold text-white text-center">Fast Shipping</h3>
                            <p className=" text-gray-200 text-md text-center">Fast & Free Delivery</p>
                        </div>
                    </div>



                    <div className="p-2 flex flex-col justify-center items-center gap-2 hover:scale-105 cursor-default transition-all duration-100">
                            <i className="fa-solid fa-box-open font-bold text-white text-lg lg:text-2xl p-1"></i>
                        <div>
                            <h3 className="text-lg font-bold text-white text-center">Discounts %</h3>
                            <p className="text-gray-200 text-md text-center">Save more on deals</p>
                        </div>
                    </div>



                    <div className="p-2 flex flex-col justify-center items-center gap-2 hover:scale-105 cursor-default transition-all duration-100">
                            <i className="fa-solid fa-wallet font-bold text-white text-lg lg:text-2xl p-1"></i>
                        <div>
                            <h3 className="text-lg font-bold text-white text-center">COD Available</h3>
                            <p className="text-gray-200 text-md text-center">Cash or Card Accepted</p>
                        </div>
                    </div>

                    <div className="p-2 flex flex-col justify-center items-center gap-2 hover:scale-105 cursor-default transition-all duration-100">
                        <i className="fa-solid fa-headset font-bold text-white text-lg lg:text-2xl p-1"></i>
                        <div>
                            <h3 className="text-lg font-bold text-white text-center">Customer Support</h3>
                            <p className="text-gray-200 text-md text-center">24/7 customer service</p>
                        </div>
                    </div>

                </div>
            </section>


        </>
       
    )
}

export default Services