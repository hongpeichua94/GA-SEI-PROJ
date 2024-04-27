import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import UpdateProfileModal from "../components/UpdateProfileModal";

// ANT DESIGN
import { Layout, theme } from "antd";
import { Avatar, Button, Space, Divider, Table, Badge, Input } from "antd";

import qs from "qs";

import styles from "./Directory.module.css";

// SCRIPTS
import {
  getEmployeeInfo,
  getEmployeeCurrentTitle,
  getEmployeeTitles,
} from "../scripts/api";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Directory = () => {
  const userCtx = useContext(UserContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      render: (name) => `${name.first} ${name.last}`,
      width: "20%",
    },
    {
      title: "Position",
      dataIndex: "gender",
      width: "20%",
    },
    {
      title: "Department",
      dataIndex: "email",
      filters: [
        {
          text: "a",
          value: "a",
        },
        {
          text: "b",
          value: "b",
        },
      ],
      width: "20%",
    },
    {
      title: "Country",
      dataIndex: "country",
      filters: [
        {
          text: "Singapore",
          value: "singapore",
        },
        {
          text: "Taiwan",
          value: "taiwan",
        },
      ],
    },
  ];
  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

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
                  //   minHeight: "75vh",
                  maxWidth: "90vw",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <div className="row" style={{ background: "white" }}>
                  <Search
                    className="col-md-6"
                    placeholder="input search text (search by email / name)"
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
                <div className="job-history" style={{ background: "white" }}>
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
