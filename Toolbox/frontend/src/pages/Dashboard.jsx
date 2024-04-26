import React, { useState } from "react";
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";

import NewEmployee from "../components/NewEmployee";

import { Breadcrumb, Layout, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="dashboard">
      <NavBar></NavBar>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <VerticalMenu></VerticalMenu>
        </Sider>
        <Layout>
          <div
            className="row"
            style={{
              // margin: "0 16px",
              padding: 10,
              // background: colorBgContainer,
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Name</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Header
            style={{
              padding: 10,
              margin: "0 16px",
              height: 180,
              maxWidth: "90vw",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h5>Home</h5>
            <div className="profile">
              <Space wrap size={16}>
                <Avatar size={64} icon={<UserOutlined />} />
              </Space>
              <div className="profile-text">
                <h4>Hello employee_name</h4>
                <p>insert role | insert department</p>
              </div>
            </div>
          </Header>
          <div className="content-container">
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <br />
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  maxWidth: "60vw",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {" "}
                <h5>Welcome new joiners to Company! 🎉</h5>
                <hr />
                <br />
                <NewEmployee></NewEmployee>
              </div>
            </Content>

            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <br />
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  maxWidth: "40vw",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {" "}
                <h5>Company Links</h5>
                <hr />
              </div>
            </Content>
          </div>
          <Footer
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
