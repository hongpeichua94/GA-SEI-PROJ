import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import UpdateProfileModal from "../components/UpdateProfileModal";

// ANT DESIGN
import { Layout, theme } from "antd";
import { Space, Table, Input } from "antd";

// import qs from "qs";

import styles from "./Directory.module.css";

// SCRIPTS
import { getAllEmployeeInfo } from "../scripts/api";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const Directory = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const columns = [
    {
      title: "Name",
      dataIndex: "employee_name",
      sorter: true,

      sorter: (a, b) => {
        const nameA = a.employee_name.toLowerCase();
        const nameB = b.employee_name.toLowerCase();

        // Compare the names alphabetically
        if (nameA < nameB) {
          return -1; // a should come before b in the sorted order
        } else if (nameA > nameB) {
          return 1; // b should come before a in the sorted order
        } else {
          return 0; // names are equal, no change in order needed
        }
      },

      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "work_email",
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "title",
      width: "20%",
    },
    {
      title: "Department",
      dataIndex: "department_name",
      filters: [
        {
          text: "Finance",
          value: "Finance",
        },
        {
          text: "Human Resource",
          value: "Human Resource",
        },
        {
          text: "Marketing",
          value: "Marketing",
        },
        {
          text: "Operations",
          value: "Operations",
        },
        {
          text: "Product",
          value: "Product",
        },
      ],
      onFilter: (value, record) => record.department_name.indexOf(value) === 0,
      width: "20%",
    },
    {
      title: "Country",
      dataIndex: "country",
      width: "20%",
    },
  ];

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(data); // Assuming data is your initial employee data

  const fetchAllEmployeeData = async (accessToken, input) => {
    setLoading(true); // Set loading the true while data is being fetched
    try {
      const employeeInfo = await getAllEmployeeInfo(accessToken, input);
      setData(employeeInfo); // Set the fetched employee data
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: employeeInfo.totalCount,
        },
      });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const onSearch = (value) => {
    setSearchInput(value); // Update the search input state
    fetchAllEmployeeData(userCtx.accessToken, value); // Call fetchAllEmployeeData with accessToken and search input
  };

  useEffect(() => {
    fetchAllEmployeeData(userCtx.accessToken);
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams(
      {
        pagination,
        filters,
        ...sorter,
      },
      [userCtx.accessToken]
    );

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

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
              padding: "10px 30px",
              height: 90,
              background: colorBgContainer,
            }}
          >
            <Space wrap size={16} className={styles.banner}>
              <h4>Employee Directory</h4>
            </Space>
          </Header>

          <div className="search">
            <Content style={{ margin: "0 16px" }}>
              <div
                style={{
                  padding: 24,
                  margin: "10px 0px",
                  maxWidth: "90vw",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <div className="row" style={{ background: "white" }}>
                  <Search
                    className="col-md-6"
                    placeholder="Search by name or email"
                    onSearch={onSearch}
                    enterButton
                  />
                </div>
              </div>
            </Content>

            <Content style={{ margin: "0 16px" }}>
              <div
                style={{
                  padding: 24,
                  margin: "10px 0px",
                  minHeight: "75vh",
                  maxWidth: "90vw",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <div style={{ background: "white" }}>
                  <Table
                    columns={columns}
                    // rowKey={(record) => record.login.uuid}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                  />
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default Directory;
