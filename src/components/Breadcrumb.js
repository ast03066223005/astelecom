import React from 'react'
import { NavLink } from 'react-router-dom'

function Breadcrumb(props) {
    return (
        <>
            <div className="breadcrumb_navigation flex gap-4 items-center bg-white text-gray-400 text-xs md:text-md lg:text-lg">
                <NavLink to={props.link_1} className="hover:text-black bg-white">{props.text_1}</NavLink>
                <i className="fa-solid fa-chevron-right bg-white"></i>
                <NavLink className="cursor-default">{props.text_2}</NavLink>
            </div>
        </>
    )
}

export default Breadcrumb