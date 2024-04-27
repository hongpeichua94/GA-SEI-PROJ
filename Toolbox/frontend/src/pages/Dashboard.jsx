import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import NewEmployee from "../components/NewEmployee";

// ANT DESIGN
import { Breadcrumb, Layout, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [employeeCurrentTitle, setEmployeeCurrentTitle] = useState({});

  const getEmployeeInfo = async () => {
    const res = await fetchData(
      `/api/employee/${userCtx.accountId}`,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      console.log(res.data[0]);
      setEmployeeDetails(res.data[0]);
    } else {
      console.log(res.data);
    }
  };

  const getEmployeeCurrentTitle = async () => {
    const res = await fetchData(
      `/api/employee/titles/${userCtx.accountId}`,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      console.log(res.data[0]);
      setEmployeeCurrentTitle(res.data[0]);
    } else {
      console.log(res.data);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    getEmployeeInfo();
    getEmployeeCurrentTitle();
  }, [userCtx.accountId]);

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
            <div className="dashboard-profile">
              <Space wrap size={16}>
                <Avatar size={64} icon={<UserOutlined />} />
              </Space>
              <div className="dashboard-profile-text">
                <h4>
                  Hello, {employeeDetails.first_name}{" "}
                  {employeeDetails.last_name} have a great day!
                </h4>
                <p>
                  {employeeCurrentTitle.title} |{" "}
                  {employeeCurrentTitle.department_name} Department
                </p>
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
          {/* <Footer
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;