import React from "react";
import { NavLink } from "react-router-dom"

const Navbar = () => {

  const links = [
    {
      id: 1,
      path: "/",
      text: "Home",
    },
    {
      id: 2,
      path: "/about",
      text: "About",
    }
  ]

  let activeClassName = "active-link"
  let inactiveClassName = "inactive-link"

  return (
    <nav className="navBar">
      <ul>
        {links.map(link => {
          return(
            <li key={link.id}>
              <NavLink to={link.path} className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>{link.text}</NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
export default Navbar