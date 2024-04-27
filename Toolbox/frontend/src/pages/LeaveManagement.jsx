import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import ProfileBanner from "../components/ProfileBanner";
import LeaveBalanceCard from "../components/LeaveBalanceCard";

// ANT DESIGN
import { Layout, theme } from "antd";

import styles from "./Profile.module.css";

// SCRIPTS
import {
  getEmployeeInfo,
  getEmployeeCurrentTitle,
  getLeaveBalance,
} from "../scripts/api";

const { Content, Sider } = Layout;

const LeaveManagement = (props) => {
  const userCtx = useContext(UserContext);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [employeeCurrentTitle, setEmployeeCurrentTitle] = useState({});
  const [overview, setOverview] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (userCtx.accountId) {
      fetchEmployeeData(userCtx.accountId, userCtx.accessToken);
      fetchEmployeeCurrentTitle(userCtx.accountId, userCtx.accessToken);
      fetchLeaveBalance(userCtx.accountId, userCtx.accessToken);
    }
  }, [userCtx.accountId, userCtx.accessToken]);

  const fetchEmployeeData = async (accountId, accessToken) => {
    const employeeInfo = await getEmployeeInfo(accountId, accessToken);
    setEmployeeDetails(employeeInfo);
  };

  const fetchEmployeeCurrentTitle = async (accountId, accessToken) => {
    const employeeCurrentTitle = await getEmployeeCurrentTitle(
      accountId,
      accessToken
    );
    setEmployeeCurrentTitle(employeeCurrentTitle);
  };

  const fetchLeaveBalance = async (accountId, accessToken) => {
    const leaveBalance = await getLeaveBalance(accountId, accessToken);
    console.log(leaveBalance);
    setOverview(leaveBalance);
  };

  return (
    <div className={styles.profile}>
      <NavBar></NavBar>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <VerticalMenu></VerticalMenu>
        </Sider>
        <Layout style={{ height: "100vh", overflow: "auto" }}>
          <ProfileBanner
            firstName={employeeDetails.first_name}
            lastName={employeeDetails.last_name}
            title={employeeCurrentTitle.title}
            joinedDate={employeeDetails.joined_date}
            profilePic={employeeDetails.profile_picture_url}
          ></ProfileBanner>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {overview.map((item) => {
              return (
                <LeaveBalanceCard
                  key={item.id}
                  id={item.id}
                  leaveType={item.leave_type}
                  balance={item.balance}
                  fetchLeaveBalance={fetchLeaveBalance}
                ></LeaveBalanceCard>
              );
            })}
          </div>
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
                <h3>Upcoming Time Off</h3>
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

export default LeaveManagement;
