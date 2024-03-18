import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/favourites"
            >
              Favourites
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/personal-trainer"
            >
              Find Trainer
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
