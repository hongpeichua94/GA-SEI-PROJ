import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

import styles from "./NavBar.module.css";

import { ToolFilled } from "@ant-design/icons";

// SCRIPTS
import { getAccountInfo } from "../scripts/api";

const NavBar = () => {
  const userCtx = useContext(UserContext);
  const [accountDetails, setAccountDetails] = useState({});

  const fetchAccountData = async (accountId, accessToken) => {
    const accountInfo = await getAccountInfo(accountId, accessToken);
    setAccountDetails(accountInfo);
  };

  useEffect(() => {
    if (userCtx.accountId) {
      fetchAccountData(userCtx.accountId, userCtx.accessToken);
    }
  }, [userCtx.accountId, userCtx.accessToken]);

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
        {accountDetails.email} |{" "}
        <a href="/login" onClick={handleLogout}>
          logout
        </a>
      </p>
    </header>
  );
};

export default NavBar;
