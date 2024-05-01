import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const NewEmployee = () => {
  return (
    <>
      <div className="announcement-row">
        <Space className="avatar" wrap size={16}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Space>
        <div className="announcement-text">
          <p>insert new NewEmployee components here</p>
          <p color="grey">7 days ago</p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default NewEmployee;
