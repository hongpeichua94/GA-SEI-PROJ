import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import ProfileBanner from "../components/ProfileBanner";

// ANT DESIGN
import { Divider, Layout, Table, Space, theme, message } from "antd";

import styles from "./Profile.module.css";

// SCRIPTS
import { getPendingExpenseRequest } from "../scripts/api";

const { Content, Sider } = Layout;

const LeavePending = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [pendingApproval, setPendingApproval] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns = [
    {
      title: "Created At",
      dataIndex: "created_at_string",
      width: "15%",
    },
    {
      title: "Expense Date",
      dataIndex: "expense_date_string",
      width: "15%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "10%",
    },
    {
      title: "Amount (S$)",
      dataIndex: "amount",
      width: "10%",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
    },
    {
      title: "Requested By",
      dataIndex: "requestor_name",
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a
            style={{ color: "#28B48A" }}
            onClick={() => handleApprove(record.uuid)}
          >
            Approve
          </a>
          <a
            style={{ color: "#FF6C64" }}
            onClick={() => handleReject(record.uuid)}
          >
            Reject
          </a>
        </Space>
      ),
    },
  ];

  const fetchPendingExpenseRequest = async (accountId, accessToken) => {
    setLoading(true); // Set loading the true while data is being fetched
    try {
      const data = await getPendingExpenseRequest(accountId, accessToken);
      setPendingApproval(data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.totalCount,
        },
      });
    } catch (error) {
      console.error("Error fetching expense request:", error);
    }
  };

  const handleApprove = async (uuid) => {
    const res = await fetchData(
      "/api/expense/approval",
      "PATCH",
      {
        uuid: uuid,
        status: "APPROVED",
      },
      userCtx.accessToken
    );
    if (res.ok) {
      message.success("Action recorded successfully");
      // console.log(res.data);
      await fetchPendingExpenseRequest(userCtx.accountId, userCtx.accessToken);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const handleReject = async (uuid) => {
    const res = await fetchData(
      "/api/expense/approval",
      "PATCH",
      {
        uuid: uuid,
        status: "REJECTED",
      },
      userCtx.accessToken
    );
    if (res.ok) {
      message.success("Action recorded successfully");
      // console.log(res.data);
      await fetchPendingExpenseRequest(userCtx.accountId, userCtx.accessToken);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    if (userCtx.accountId) {
      fetchPendingExpenseRequest(userCtx.accountId, userCtx.accessToken);
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
            joinedDate={props.employeeDetails.joined_date_string}
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
              <Divider orientation="center">Pending Approval</Divider>
              <Table
                columns={columns}
                // rowKey={(record) => record.uuid}
                dataSource={pendingApproval}
                pagination={tableParams.pagination}
                loading={loading}
                // onChange={handleTableChange}
              />
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
