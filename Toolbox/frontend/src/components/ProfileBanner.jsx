import React from "react";

// ANT DESIGN
import { Layout, theme, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

import styles from "../pages/Profile.module.css";

const { Header } = Layout;

const ProfileBanner = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
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
          <Avatar size={90} icon={<UserOutlined />} src={props.profilePic} />

          <div className={styles.about}>
            <h4>
              {props.firstName} {props.lastName}{" "}
            </h4>
            <p>
              {props.title} | {props.departmentName}
            </p>
          </div>
        </div>

        <div className={styles.joinedDate}>
          <h5>Joined since</h5>
          <h4>{props.joinedDate}</h4>
        </div>
      </Space>
    </Header>
  );
};

export default ProfileBanner;
