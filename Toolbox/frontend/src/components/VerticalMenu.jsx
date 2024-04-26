import React, { useState } from "react";
import {
  HomeOutlined,
  ProfileOutlined,
  CalendarOutlined,
  FileOutlined,
  TeamOutlined,
  DollarOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("My Profile", "2", <ProfileOutlined />),
  getItem("Employee Directory", "3", <TeamOutlined />),
  getItem("Leave Management", "sub1", <CalendarOutlined />, [
    getItem("Request Time Off", "4"),
    getItem("Pending Approval", "5"),
  ]),
  getItem("Expense Tracker", "sub2", <DollarOutlined />, [
    getItem("Submit Expense", "6"),
    getItem("Expense History", "8"),
  ]),
  getItem("Knowledge Base", "9", <StarOutlined />),
  getItem("Admin Console", "10", <FileOutlined />),
];

const VerticalMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        // collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </Layout>
  );
};
export default VerticalMenu;
