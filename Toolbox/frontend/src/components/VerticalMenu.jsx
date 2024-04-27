import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  ProfileOutlined,
  CalendarOutlined,
  FileOutlined,
  TeamOutlined,
  DollarOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

function getItem(label, path, icon, children) {
  return {
    path,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "/dashboard", <HomeOutlined />),
  getItem("My Profile", "/profile", <ProfileOutlined />),
  getItem("Employee Directory", "/directory", <TeamOutlined />),
  getItem("Leave Management", "/leave", <CalendarOutlined />, [
    getItem("Request Time Off", "/leave/request"),
    getItem("Pending Approval", "/leave/pending"),
  ]),
  getItem("Expense Tracker", "/expense", <DollarOutlined />, [
    getItem("Submit Expense", "/expense/submit"),
    getItem("Expense History", "/expense/history"),
  ]),
  getItem("Knowledge Base", "/knowledge-base", <StarOutlined />),
  getItem("Admin Console", "/admin", <FileOutlined />),
];

const VerticalMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path} style={{ textDecoration: "none" }}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </Layout>
  );
};
export default VerticalMenu;
