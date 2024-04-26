import React, { useState } from "react";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";

// ANT DESIGN
import { Breadcrumb, Layout, theme } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Space, Divider, Table } from "antd";

import styles from "./Profile.module.css";

const { Header, Content, Sider } = Layout;

const columns = [
  {
    title: "Position",
    dataIndex: "position",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Appointment Period",
    dataIndex: "period",
  },
];
const data = [
  {
    key: "1",
    position: "John Brown",
    department: "￥300,000.00",
    period: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    position: "Jim Green",
    department: "￥1,256,000.00",
    period: "London No. 1 Lake Park",
  },
];

const Profile = () => {
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
          <Header
            style={{
              padding: 10,
              margin: "10px 16px",
              height: 120,
              maxWidth: "90vw",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Space wrap size={16} className={styles.banner}>
              <div className={styles.userInfo}>
                <Avatar size={90} icon={<UserOutlined />} />
                <div className={styles.about}>
                  <h4>EMPLOYEE NAME HERE</h4>
                  <p>EMPLOYEE TITLE HERE</p>
                </div>
              </div>

              <div className={styles.joinedDate}>
                <h5>Joined since</h5>
                <h4>START DATE HERE</h4>
              </div>
            </Space>
          </Header>

          <div className="details">
            <Content style={{ margin: "0 16px" }}>
              <div
                style={{
                  padding: 24,
                  minHeight: "75vh",
                  maxWidth: "90vw",
                  background: colorBgContainer,

                  borderRadius: borderRadiusLG,
                }}
              >
                <div className="personal" style={{ background: "white" }}>
                  <div className="row">
                    <h5 className="col-md-1">Personal</h5>
                    <Button className="col-md-1" icon={<EditOutlined />}>
                      Edit
                    </Button>
                  </div>
                  <br />
                  <table>
                    <thead className={styles.tableHeader}>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Employee Id</th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableCell}>
                      <tr>
                        <td>Taco</td>
                        <td>Bell</td>
                        <td>Address</td>
                      </tr>
                    </tbody>
                    <thead className={styles.tableHeader}>
                      <tr>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableCell}>
                      <tr>
                        <td>Taco</td>
                        <td>Bell</td>
                        <td></td>
                      </tr>
                    </tbody>
                    <thead className={styles.tableHeader}>
                      <tr>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableCell}>
                      <tr>
                        <td>Active</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />
                <br />
                <div className="contacts" style={{ background: "white" }}>
                  <div className="row">
                    <h5 className="col-md-1">Contact</h5>
                    <Button className="col-md-1" icon={<EditOutlined />}>
                      Edit
                    </Button>
                  </div>
                  <br />
                  <table>
                    <thead className={styles.tableHeader}>
                      <tr>
                        <th>Address</th>
                        <th>Country</th>
                        <th>Postal Code</th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableCell}>
                      <tr>
                        <td>71 Anson Road</td>
                        <td>Singapore</td>
                        <td>123456</td>
                      </tr>
                    </tbody>
                    <thead className={styles.tableHeader}>
                      <tr>
                        <th>Phone</th>
                        <th>Email</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className={styles.tableCell}>
                      <tr>
                        <td>912345678</td>
                        <td>hello@gmail.com</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <br />
                <br />
                <div className="job-history" style={{ background: "white" }}>
                  <h5>Job History</h5>
                  <br />
                  <Table columns={columns} dataSource={data} />
                </div>
              </div>
            </Content>
          </div>
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

export default Profile;
