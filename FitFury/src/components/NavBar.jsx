import React from "react";
import styles from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            {/* <Link to="/main">Main</Link> */}
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            {/* <Link to="/members">Members</Link> */}
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/exercises"
            >
              Exercises
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
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
