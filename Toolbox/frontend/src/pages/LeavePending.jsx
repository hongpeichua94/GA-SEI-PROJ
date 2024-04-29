import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import ProfileBanner from "../components/ProfileBanner";
import LeaveBalanceCard from "../components/LeaveBalanceCard";

// ANT DESIGN
import { Divider, List, Layout, theme } from "antd";

import styles from "./Profile.module.css";

// SCRIPTS
import { getPendingLeaveRequest } from "../scripts/api";

const { Content, Sider } = Layout;

const LeavePending = (props) => {
  const userCtx = useContext(UserContext);

  const [pendingApproval, setPendingApproval] = useState([]);

  const fetchPendingLeaveRequest = async (accountId, accessToken) => {
    const data = await getPendingLeaveRequest(accountId, accessToken);
    console.log(data);
    setPendingApproval(data);
  };
  useEffect(() => {
    if (userCtx.accountId) {
      fetchPendingLeaveRequest(userCtx.accountId, userCtx.accessToken);
    }
  }, [userCtx.accountId, userCtx.accessToken]);

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
          <ProfileBanner
            firstName={props.employeeDetails.first_name}
            lastName={props.employeeDetails.last_name}
            title={props.employeeCurrentTitle.title}
            departmentName={props.employeeCurrentTitle.department_name}
            joinedDate={props.employeeDetails.joined_date}
            profilePic={props.employeeDetails.profile_picture_url}
          ></ProfileBanner>

          <Content style={{ margin: "10px 16px" }}>
            <div
              style={{
                padding: 24,
                minHeight: "75vh",
                maxWidth: "90vw",
                background: colorBgContainer,

                borderRadius: borderRadiusLG,
              }}
            >
              <div className="row">
                <h3>Pending Approval</h3>
                <Divider orientation="center">Upcoming Time-Off</Divider>
                <List
                  itemLayout="horizontal"
                  dataSource={pendingApproval}
                  renderItem={(item, index) => (
                    <List.Item actions={[<a key="delete">delete</a>]}>
                      <List.Item.Meta
                        title={`[${item.status}] ${item.leave_type} LEAVE (${item.duration} DAYS)`}
                        description={`From ${
                          item.start_date.split("T")[0]
                        } to ${item.end_date.split("T")[0]}`}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Content>

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

export default LeavePending;
