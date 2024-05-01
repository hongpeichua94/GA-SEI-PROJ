import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import ProfileBanner from "../components/ProfileBanner";
import ExpenseSummaryCard from "../components/ExpenseSummaryCard";

// ANT DESIGN
import { Divider, Layout, Table, Space, theme, message } from "antd";

import styles from "./Profile.module.css";

// SCRIPTS
import { getEmployeeExpense, getEmployeeExpenseSummary } from "../scripts/api";

const { Content, Sider } = Layout;

const Expense = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [expenses, setExpenses] = useState([]);
  const [expenseSummary, setExpenseSummary] = useState([]);
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
  ];

  const fetchEmployeeExpense = async (accountId, accessToken) => {
    setLoading(true); // Set loading the true while data is being fetched
    try {
      const data = await getEmployeeExpense(accountId, accessToken);
      setExpenses(data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.totalCount,
        },
      });
    } catch (error) {
      console.error("Error fetching employee expenses:", error);
    }
  };

  const fetchEmployeeExpenseSummary = async (accountId, accessToken) => {
    const expenseSummary = await getEmployeeExpenseSummary(
      accountId,
      accessToken
    );
    setExpenseSummary(expenseSummary);
  };

  useEffect(() => {
    if (userCtx.accountId) {
      fetchEmployeeExpense(userCtx.accountId, userCtx.accessToken);
      fetchEmployeeExpenseSummary(userCtx.accountId, userCtx.accessToken);
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {expenseSummary.map((item) => {
              return (
                <ExpenseSummaryCard
                  key={item.id}
                  id={item.id}
                  status={item.status}
                  amount={item.total_amount}
                  fetchEmployeeExpenseSummary={fetchEmployeeExpenseSummary}
                ></ExpenseSummaryCard>
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
                <Divider orientation="center">My Expenses</Divider>
                <Table
                  columns={columns}
                  // rowKey={(record) => record.uuid}
                  dataSource={expenses}
                  pagination={tableParams.pagination}
                  loading={loading}
                  // onChange={handleTableChange}
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

export default Expense;
