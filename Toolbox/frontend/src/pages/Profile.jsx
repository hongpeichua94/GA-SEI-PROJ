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
import { EditOutlined } from "@ant-design/icons";

import styles from "./Profile.module.css";

// SCRIPTS
import { getEmployeeTitles } from "../scripts/api";

const { Header, Content, Sider } = Layout;

const Profile = (props) => {
  const userCtx = useContext(UserContext);
  const [employeeTitles, setEmployeeTitles] = useState([]);
  const [showProfileUpdateModal, setShowProfileUpdateModal] = useState(false);

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

  const fetchEmployeeTitles = async (accountId, accessToken) => {
    const employeeTitles = await getEmployeeTitles(accountId, accessToken);

    // Map the fetched titles to the format required by the Table component
    const formattedData = employeeTitles.map((employeeTitle, index) => {
      let period;

      if (employeeTitle.status !== "ACTIVE") {
        period = `${employeeTitle.start_date_string} to ${employeeTitle.end_date_string}`;
      } else {
        period = `${employeeTitle.start_date_string} to Present`;
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

  useEffect(() => {
    if (userCtx.accountId) {
      fetchEmployeeTitles(userCtx.accountId, userCtx.accessToken);
    }
  }, [userCtx.accountId, userCtx.accessToken]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      {showProfileUpdateModal && (
        <UpdateProfileModal
          id={props.employeeDetails.account_id}
          status={props.employeeDetails.status}
          address={props.employeeDetails.address}
          country={props.employeeDetails.country}
          postalCode={props.employeeDetails.postal_code}
          phone={props.employeeDetails.phone}
          email={props.employeeDetails.email}
          resignedDate={props.employeeDetails.resigned_date}
          profilePic={props.employeeDetails.profile_picture_url}
          setShowProfileUpdateModal={setShowProfileUpdateModal}
          fetchEmployeeData={props.fetchEmployeeData}
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
              firstName={props.employeeDetails.first_name}
              lastName={props.employeeDetails.last_name}
              title={props.employeeCurrentTitle.title}
              departmentName={props.employeeCurrentTitle.department_name}
              joinedDate={props.employeeDetails.joined_date_string}
              profilePic={props.employeeDetails.profile_picture_url}
            ></ProfileBanner>
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
                          <td>{props.employeeDetails.first_name}</td>
                          <td>{props.employeeDetails.last_name}</td>
                          <td>{props.employeeDetails.id}</td>
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
                          <td>{props.employeeDetails.date_of_birth_string}</td>
                          <td>{props.employeeDetails.gender}</td>
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
                            {props.employeeDetails.status === "ACTIVE" ? (
                              <Badge status="success" />
                            ) : (
                              <Badge status="error" />
                            )}{" "}
                            {props.employeeDetails.status}
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
                          <td>{props.employeeDetails.address}</td>
                          <td>{props.employeeDetails.country}</td>
                          <td>{props.employeeDetails.postal_code}</td>
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
                          <td>{props.employeeDetails.phone}</td>
                          <td>{props.employeeDetails.email}</td>
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
