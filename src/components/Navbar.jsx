import React from "react";
import style from "./CSS/Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul className={style.navbar}>
          <li>
            <NavLink className={style.link} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={style.link} to="/form">
              Form
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
