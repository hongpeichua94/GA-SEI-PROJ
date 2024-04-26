import React from "react";

import styles from "./NavBar.module.css";

import { ToolFilled } from "@ant-design/icons";

const NavBar = () => {
  const handleLogout = () => {
    alert("logout");
  };

  return (
    <header className={styles.navbar}>
      <h5>
        Toolbox
        <ToolFilled />
      </h5>
      <p>
        email |{" "}
        <a href="/login" onClick={handleLogout}>
          logout
        </a>
      </p>
    </header>
  );
};

export default NavBar;
