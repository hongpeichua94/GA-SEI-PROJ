import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";

// ANT DESIGN
import { Layout, theme } from "antd";

import styles from "./Profile.module.css";

const { Content, Sider } = Layout;

const Expense = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className={styles.profile}>
      <NavBar></NavBar>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <VerticalMenu></VerticalMenu>
        </Sider>
        <Layout style={{ height: "100vh", overflow: "auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          ></div>
          <Content style={{ margin: "10px 16px" }}>
            <div
              style={{
                padding: 24,
                minHeight: "75vh",
                maxWidth: "90vw",
                background: colorBgContainer,

                borderRadius: borderRadiusLG,
              }}
            >
              <div className="row">
                <img src="https://cdn.dribbble.com/users/346578/screenshots/16350511/media/233609e1b219e48cb56be1beac820778.png?resize=1600x1200&vertical=center" />
              </div>
            </div>
          </Content>

          <br />
          <br />
          <br />
          <br />
          <br />
        </Layout>
      </Layout>
    </div>
  );
};

export default Expense;
