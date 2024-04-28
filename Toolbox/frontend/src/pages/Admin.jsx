import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import CreateAccountModal from "../components/CreateAccountModal";

// ANT DESIGN
import { Layout, theme } from "antd";
import {
  Avatar,
  Button,
  Space,
  Divider,
  Table,
  Badge,
  Input,
  Switch,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import styles from "./Directory.module.css";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const Admin = () => {
  const userCtx = useContext(UserContext);

  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const createModal = () => {
    setShowCreateAccountModal(true);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      {showCreateAccountModal && (
        <CreateAccountModal
          setShowCreateAccountModal={setShowCreateAccountModal}
        ></CreateAccountModal>
      )}

      <div className={styles.profile}>
        <NavBar></NavBar>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <VerticalMenu></VerticalMenu>
          </Sider>
          <Layout style={{ height: "100vh", overflow: "auto" }}>
            <Header
              style={{
                padding: "10px 30px",
                height: 90,
                background: colorBgContainer,
              }}
            >
              <Space wrap size={16} className={styles.banner}>
                <h4>Admin Console</h4>
              </Space>
            </Header>

            <div className="search">
              <Content style={{ margin: "0 16px" }}>
                <div
                  style={{
                    padding: 24,
                    margin: "10px 0px",
                    maxWidth: "90vw",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <div className="row" style={{ background: "white" }}>
                    <Search
                      className="col-md-6"
                      placeholder="Filter by email"
                      onSearch={onSearch}
                      enterButton
                    />
                    <div className="col-md-4"></div>

                    <Button
                      className="col-md-2"
                      onClick={createModal}
                      icon={<UserAddOutlined />}
                    >
                      Add Employee
                    </Button>
                  </div>
                </div>
              </Content>

              <Content style={{ margin: "0 16px" }}>
                <div
                  style={{
                    padding: 24,
                    margin: "10px 0px",
                    minHeight: "75vh",
                    maxWidth: "90vw",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <div
                    className="access"
                    style={{ background: "white", fontSize: 16 }}
                  >
                    <div className="name row">
                      <div
                        className="col-md-2"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Name
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        Access
                      </div>
                    </div>
                    <div className="position row">
                      <div
                        className="col-md-2"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Title
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        Access
                      </div>
                    </div>
                    <div className="department row">
                      <div
                        className="col-md-2"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Department
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        Access
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div
                        className="col-md-3"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Feature
                      </div>
                      <div
                        className="col-md-1"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Access
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Admin Console
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch defaultChecked onChange={onChange} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Account Info
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch defaultChecked onChange={onChange} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Employee Directory
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch defaultChecked onChange={onChange} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Leave Management
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch defaultChecked onChange={onChange} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Expense Tracker
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch defaultChecked onChange={onChange} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Knowledge Base
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch defaultChecked onChange={onChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Content>
            </div>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default Admin;
