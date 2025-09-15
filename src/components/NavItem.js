import React from 'react'
import { NavLink } from 'react-router-dom'

function NavItem(props) {
  return (
    <>
        <li className='list-none mx-1'>
        <NavLink to={props.toLink || " "} className={({ isActive }) => isActive ? "text-xl transition-colors duration-500 ease-in-out block md:flex  justify-center items-center py-2 px-3 bg-white md:bg-transparent w-full rounded md:rounded-none md:hover:bg-transparent  border-b-4 border-primary ": "block md:flex justify-center items-center py-2 px-3 rounded  md:hover:bg-transparent text-gray-100  text-xl"} aria-label={props.ariaLabel}>{props.linkName}</NavLink>
      </li>
    </>
  )
}


export default NavItem