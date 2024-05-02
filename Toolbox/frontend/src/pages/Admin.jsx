import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import CreateAccountModal from "../components/CreateAccountModal";

// ANT DESIGN
import { Layout, theme } from "antd";
import { Button, Space, Input, Switch, Dropdown, message } from "antd";
import { UserAddOutlined, DownOutlined } from "@ant-design/icons";

import styles from "./Directory.module.css";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const Admin = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [accountDetails, setAccountDetails] = useState({});

  const createModal = () => {
    setShowCreateAccountModal(true);
  };

  const onSearch = async (value) => {
    setSearchValue(value); // Update state with the search value
    try {
      const res = await fetchData(
        "/api/accounts/search",
        "POST",
        { email: value },
        userCtx.accessToken
      );
      setSearchResult(res.data[0]);
      setAccountDetails(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuClick = async (e) => {
    // Find the clicked item based on the key
    const clickedItem = items.find((item) => item.key === e.key);
    if (clickedItem) {
      // Update specific fields in accountDetails based on the clicked item
      let updatedData = {};

      switch (clickedItem.label) {
        case "ADMIN":
          updatedData = {
            role: "ADMIN", // Update role to 'ADMIN'
            access_admin_console: true, // Example: Enable admin console access
          };
          break;
        case "MANAGER":
          updatedData = {
            role: "MANAGER", // Update role to 'MANAGER'
          };
          break;
          break;
        case "USER":
          updatedData = {
            role: "USER", // Update role to 'USER'
          };
          break;
        default:
          break;
      }
      // Update the state immediately
      setAccountDetails((prevDetails) => ({
        ...prevDetails,
        ...updatedData, // Merge updatedData with existing state
      }));

      // Update endpoint
      try {
        const res = await fetchData(
          `/api/accounts/${accountDetails.uuid}`,
          "PATCH",
          updatedData,
          userCtx.accessToken
        );
        if (res.ok) {
          // Database update successful
          message.success(
            `Account role updated successfully to "${clickedItem.label}"`
          );
          // console.log(res.data);
        } else {
          message.error(
            `Failed to update account role to ${clickedItem.label}`
          );
        }
      } catch (error) {
        console.error("Error updating account:", error);
      }
    }
    // console.log("click", e);
  };

  const items = [
    {
      key: "1",
      label: "ADMIN",
    },
    {
      key: "2",
      label: "MANAGER",
    },
    {
      key: "3",
      label: "USER",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onChange = async (field, checked) => {
    // Update the state immediately
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [field]: checked, // Update the specified field
    }));

    // Update the database with the modified data
    try {
      const res = await fetchData(
        `/api/accounts/${accountDetails.uuid}`,
        "PATCH",
        { [field]: checked }, // Send only the changed field
        userCtx.accessToken
      );
      if (res.ok) {
        // Database update successful
        message.success(`Access to ${field} updated successfully`);
      } else {
        message.error(`Failed to update access to ${field}`);
      }
    } catch (error) {
      console.error(`Error updating access to ${field}:`, error);
      message.error(`Error updating access to ${field}`);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      {showCreateAccountModal && (
        <CreateAccountModal
          setShowCreateAccountModal={setShowCreateAccountModal}
        ></CreateAccountModal>
      )}

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
                <h4>Admin Console</h4>
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
                      placeholder="Filter by email"
                      onSearch={onSearch}
                      enterButton
                    />
                    <div className="col-md-4"></div>

                    <Button
                      className="col-md-2"
                      onClick={createModal}
                      icon={<UserAddOutlined />}
                    >
                      Add Employee
                    </Button>
                  </div>
                </div>
              </Content>

              <Content style={{ margin: "0 16px" }}>
                <div
                  style={{
                    padding: 24,
                    margin: "10px 0px",
                    minHeight: "60vh",
                    maxWidth: "90vw",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <div
                    className="access"
                    style={{ background: "white", fontSize: 14 }}
                  >
                    <div className="name row">
                      <div
                        className="col-md-2"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Name
                      </div>
                      <div className="col-md-4" style={{ margin: 10 }}>
                        {accountDetails.employee_name}
                      </div>
                    </div>
                    <div className="position row">
                      <div
                        className="col-md-2"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Title
                      </div>
                      <div className="col-md-4" style={{ margin: 10 }}>
                        {accountDetails.title}
                      </div>
                    </div>
                    <div className="department row">
                      <div
                        className="col-md-2"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Department
                      </div>
                      <div className="col-md-4" style={{ margin: 10 }}>
                        {accountDetails.department_name}
                      </div>
                    </div>
                    <div className="department row">
                      <div
                        className="col-md-2"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Role
                      </div>

                      <div className="col-md-4" style={{ margin: 10 }}>
                        <Dropdown menu={menuProps}>
                          <Button>
                            <Space>
                              {accountDetails.role}
                              <DownOutlined />
                            </Space>
                          </Button>
                        </Dropdown>
                      </div>

                      <div className="col-md-4"></div>
                    </div>
                    <br />
                    <div className="row">
                      <div
                        className="col-md-3"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Feature
                      </div>
                      <div
                        className="col-md-1"
                        style={{ margin: 10, fontWeight: 600 }}
                      >
                        Access
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Admin Console
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch
                          checked={accountDetails.access_admin_console}
                          onChange={(checked) =>
                            onChange("access_admin_console", checked)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Account Info
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch
                          checked={accountDetails.access_account_info}
                          onChange={(checked) =>
                            onChange("access_account_info", checked)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Employee Directory
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch
                          checked={accountDetails.access_employee_directory}
                          onChange={(checked) =>
                            onChange("access_employee_directory", checked)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Leave Management
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch
                          checked={accountDetails.access_leave_management}
                          onChange={(checked) =>
                            onChange("access_leave_management", checked)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Expense Tracker
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch
                          checked={accountDetails.access_expense_tracker}
                          onChange={(checked) =>
                            onChange("access_expense_tracker", checked)
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3" style={{ margin: 10 }}>
                        Knowledge Base
                      </div>
                      <div className="col-md-1" style={{ margin: 10 }}>
                        <Switch
                          checked={accountDetails.access_knowledge_base}
                          onChange={(checked) =>
                            onChange("access_knowledge_base", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
              </Content>
            </div>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default Admin;
