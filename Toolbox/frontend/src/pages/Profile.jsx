import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import ProfileBanner from "../components/ProfileBanner";
import UpdateProfileModal from "../components/UpdateProfileModal";

// ANT DESIGN
import {
  Layout,
  theme,
  Avatar,
  Button,
  Space,
  Divider,
  Table,
  Badge,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

import styles from "./Profile.module.css";

// SCRIPTS
import {
  getEmployeeInfo,
  getEmployeeCurrentTitle,
  getEmployeeTitles,
} from "../scripts/api";

const { Header, Content, Sider } = Layout;

const Profile = (props) => {
  const userCtx = useContext(UserContext);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [employeeCurrentTitle, setEmployeeCurrentTitle] = useState({});
  const [employeeTitles, setEmployeeTitles] = useState([]);
  const [showProfileUpdateModal, setShowProfileUpdateModal] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns = [
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Appointment Period",
      dataIndex: "period",
    },
  ];

  useEffect(() => {
    if (userCtx.accountId) {
      fetchEmployeeData(userCtx.accountId, userCtx.accessToken);
      fetchEmployeeCurrentTitle(userCtx.accountId, userCtx.accessToken);
      fetchEmployeeTitles(userCtx.accountId, userCtx.accessToken);
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

  const fetchEmployeeTitles = async (accountId, accessToken) => {
    const employeeTitles = await getEmployeeTitles(accountId, accessToken);

    // Map the fetched titles to the format required by the Table component
    const formattedData = employeeTitles.map((employeeTitle, index) => {
      let period;

      if (employeeTitle.status !== "ACTIVE") {
        period = `${employeeTitle.start_date} to ${employeeTitle.end_date}`;
      } else {
        period = `${employeeTitle.start_date} to Present`;
      }

      return {
        key: index.toString(),
        position: employeeTitle.title,
        department: employeeTitle.department_name,
        period: period,
      };
    });

    setEmployeeTitles(formattedData);
  };

  return (
    <>
      {showProfileUpdateModal && (
        <UpdateProfileModal
          id={employeeDetails.account_id}
          status={employeeDetails.status}
          address={employeeDetails.address}
          country={employeeDetails.country}
          postalCode={employeeDetails.postal_code}
          phone={employeeDetails.phone}
          email={employeeDetails.email}
          resignedDate={employeeDetails.resigned_date}
          profilePic={employeeDetails.profile_picture_url}
          setShowProfileUpdateModal={setShowProfileUpdateModal}
          fetchEmployeeData={fetchEmployeeData}
          employeeCurrentTitle={employeeCurrentTitle}
        />
      )}

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
            {/* <Header
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
                  <Avatar
                    size={90}
                    icon={<UserOutlined />}
                    src={employeeDetails.profile_picture_url}
                  />

                  <div className={styles.about}>
                    <h4>
                      {employeeDetails.first_name} {employeeDetails.last_name}{" "}
                    </h4>
                    <p>{employeeCurrentTitle.title}</p>
                  </div>
                </div>

                <div className={styles.joinedDate}>
                  <h5>Joined since</h5>
                  <h4>{employeeDetails.joined_date}</h4>
                </div>
              </Space>
            </Header> */}

            <div className="details">
              <Content style={{ margin: "0 16px" }}>
                <div
                  style={{
                    padding: 24,
                    minHeight: "75vh",
                    maxWidth: "90vw",
                    background: colorBgContainer,

                    borderRadius: borderRadiusLG,
                  }}
                >
                  <div className="personal" style={{ background: "white" }}>
                    <div className="row">
                      <h5 className="col-md-2">Personal</h5>
                    </div>
                    <br />
                    <table>
                      <thead className={styles.tableHeader}>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Employee Id</th>
                        </tr>
                      </thead>
                      <tbody className={styles.tableCell}>
                        <tr>
                          <td>{employeeDetails.first_name}</td>
                          <td>{employeeDetails.last_name}</td>
                          <td>{employeeDetails.id}</td>
                        </tr>
                      </tbody>
                      <thead className={styles.tableHeader}>
                        <tr>
                          <th>Date of Birth</th>
                          <th>Gender</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className={styles.tableCell}>
                        <tr>
                          <td>{employeeDetails.date_of_birth}</td>
                          <td>{employeeDetails.gender}</td>
                          <td></td>
                        </tr>
                      </tbody>
                      <thead className={styles.tableHeader}>
                        <tr>
                          <th>Status</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className={styles.tableCell}>
                        <tr>
                          <td>
                            {employeeDetails.status === "ACTIVE" ? (
                              <Badge status="success" />
                            ) : (
                              <Badge status="error" />
                            )}{" "}
                            {employeeDetails.status}
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <br />
                  <br />
                  <div className="contacts" style={{ background: "white" }}>
                    <div className="row">
                      <h5 className="col-md-2">Contact</h5>
                      <Button
                        className="col-md-1"
                        icon={<EditOutlined />}
                        onClick={() => setShowProfileUpdateModal(true)}
                      >
                        Edit
                      </Button>
                    </div>
                    <br />
                    <table>
                      <thead className={styles.tableHeader}>
                        <tr>
                          <th>Address</th>
                          <th>Country</th>
                          <th>Postal Code</th>
                        </tr>
                      </thead>
                      <tbody className={styles.tableCell}>
                        <tr>
                          <td>{employeeDetails.address}</td>
                          <td>{employeeDetails.country}</td>
                          <td>{employeeDetails.postal_code}</td>
                        </tr>
                      </tbody>
                      <thead className={styles.tableHeader}>
                        <tr>
                          <th>Phone</th>
                          <th>Email</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className={styles.tableCell}>
                        <tr>
                          <td>{employeeDetails.phone}</td>
                          <td>{employeeDetails.email}</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <br />
                  <br />
                  <div className="job-history" style={{ background: "white" }}>
                    <h5>Job History</h5>
                    <br />
                    <Table columns={columns} dataSource={employeeTitles} />
                  </div>
                </div>
              </Content>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default Profile;
