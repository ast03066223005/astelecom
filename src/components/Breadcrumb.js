import React from 'react'
import { NavLink } from 'react-router-dom'

function Breadcrumb(props) {
    return (
        <>
            <div className="breadcrumb_navigation flex gap-4 items-center text-gray-400 text-xs md:text-md lg:text-lg">
                <NavLink to={props.link_1} className="hover:text-black">{props.text_1}</NavLink>
                <i className="fa-solid fa-chevron-right"></i>
                <NavLink className="cursor-default">{props.text_2}</NavLink>
            </div>
        </>
    )
}

export default Breadcrumb