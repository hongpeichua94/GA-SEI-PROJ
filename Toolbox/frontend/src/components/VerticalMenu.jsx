import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../context/user";

import {
  HomeOutlined,
  ProfileOutlined,
  CalendarOutlined,
  FileOutlined,
  TeamOutlined,
  DollarOutlined,
  StarOutlined,
} from "@ant-design/icons";

import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

const VerticalMenu = () => {
  const userCtx = useContext(UserContext);
  const currentPage = useLocation().pathname;

  const [collapsed, setCollapsed] = useState(false);

  const items = [
    getItem("Home", "/dashboard", <HomeOutlined />),
    getItem("My Profile", `/profile/${userCtx.accountId}`, <ProfileOutlined />),
    getItem("Employee Directory", "/directory", <TeamOutlined />),
    getItem("Leave Management", "sub1", <CalendarOutlined />, [
      getItem("Overview", `/leave/${userCtx.accountId}`),
      getItem("Request Time Off", "/leave/apply"),
      (userCtx.role === "ADMIN" || userCtx.role === "MANAGER") &&
        getItem("Pending Approval", "/leave/pending"),
    ]),
    getItem("Expense Tracker", "sub2", <DollarOutlined />, [
      getItem("My Expenses", `/expense/${userCtx.accountId}`),
      getItem("Submit Expense", "/expense/submit"),
      (userCtx.role === "ADMIN" || userCtx.role === "MANAGER") &&
        getItem("Pending Approval", "/expense/pending"),
    ]),
    getItem("Knowledge Base", "/knowledge-base", <StarOutlined />),
    userCtx.role === "ADMIN" &&
      getItem("Admin Console", "/admin", <FileOutlined />),
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        // collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={[currentPage]} mode="inline">
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
                {item.children.map((childItem) => (
                  <Menu.Item key={childItem.key}>
                    <Link to={childItem.key} style={{ textDecoration: "none" }}>
                      {childItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.key} style={{ textDecoration: "none" }}>
                  {item.label}
                </Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
    </Layout>
  );
};
export default VerticalMenu;
