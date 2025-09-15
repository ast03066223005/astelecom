import React from 'react'
import Buttons from './Buttons'

function NewsLetter() {
  return (
    <>

<div className="news-bg px-4 bg-white flex items-center justify-center  max-w-4xl mx-auto">

    <div className="newsL z-40 bg-white p-4 pb-0 rounded-md md:rounded-lg shadow-lg w-full relative top-12 flex flex-col items-center justify-center">

    <div className="join w-full">
                                <div className="heading">
                                    <p className="text-2xl font-bold pb-4">Join a Newsletter</p>
                                </div>
                                <div className="form">

                                    <div className=" mx-auto">
                                        <div className="flex ">

                                            <div className="relative rounded-full flex  gap-2 w-full">
                                                <input type="email" className="shadow-lg p-2 text-sm text-gray-900 bg-gray-50 rounded-md focus:outline-primary w-full" placeholder="your email/number here..." required="" />
                                                <Buttons btnText={<i className="fa-solid fa-paper-plane "></i>}/>
                                        
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="links py-2 my-2">
                                    <ul className="flex gap-4 md:gap-2 w-1/3 justify-start md:justify-between items-center text-black text-sm ">


                                        <li className=" flex justify-center items-center p-2 h-[25px] w-[25px] rounded-full border-[1px] border-gray-100 cursor-pointer hover:bg-white hover:border-primary hover:text-primary">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </li>

                                        <li className=" flex justify-center items-center p-2 h-[25px] w-[25px] rounded-full border-[1px] border-gray-100 cursor-pointer hover:bg-white hover:border-primary hover:text-primary">
                                            <i className="fa-brands fa-youtube"></i>
                                        </li>

                                        <li className=" flex justify-center items-center p-2 h-[25px] w-[25px] rounded-full border-[1px] border-gray-100 cursor-pointer hover:bg-white hover:border-primary hover:text-primary">
                                            <i className="fa-brands fa-linkedin-in"></i>
                                        </li>

                                        <li className=" flex justify-center items-center p-2 h-[25px] w-[25px] rounded-full border-[1px] border-gray-100 cursor-pointer hover:bg-white hover:border-primary hover:text-primary">
                                            <i className="fa-brands fa-x-twitter"></i>
                                        </li>

                                        <li className=" flex justify-center items-center p-2 h-[25px] w-[25px] rounded-full border-[1px] border-gray-100 cursor-pointer hover:bg-white hover:border-primary hover:text-primary">
                                            <i className="fa-brands fa-pinterest-p "></i>
                                        </li>

                                    </ul>
                                </div>
                            </div>
    </div>
</div>
                         
    </>
  )
}

export default NewsLetter