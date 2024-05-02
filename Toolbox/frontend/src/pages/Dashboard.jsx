import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import NewEmployee from "../components/NewEmployee";

// ANT DESIGN
import { Layout, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

// SCRIPTS
import { getEmployeeInfo, getEmployeeCurrentTitle } from "../scripts/api";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const userCtx = useContext(UserContext);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [employeeCurrentTitle, setEmployeeCurrentTitle] = useState({});

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchEmployeeData = async (accountId, accessToken) => {
    const employeeInfo = await getEmployeeInfo(accountId, accessToken);
    setEmployeeDetails(employeeInfo);

    const employeeTitle = await getEmployeeCurrentTitle(accountId, accessToken);
    setEmployeeCurrentTitle(employeeTitle);
  };

  useEffect(() => {
    if (userCtx.accountId) {
      fetchEmployeeData(userCtx.accountId, userCtx.accessToken);
    }
  }, [userCtx.accountId, userCtx.accessToken]);

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
          ></div>
          <Header
            style={{
              padding: 10,
              margin: "0 16px",
              height: 130,
              maxWidth: "90vw",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="dashboard-profile">
              <Space wrap size={16}>
                <Avatar
                  size={90}
                  icon={<UserOutlined />}
                  src={employeeDetails.profile_picture_url}
                />
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
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
