import React, { useContext, useEffect, useState, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

// COMPONENTS
import NavBar from "../components/NavBar";
import VerticalMenu from "../components/VerticalMenu";
import ProfileBanner from "../components/ProfileBanner";

// ANT DESIGN
import {
  Layout,
  theme,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./Profile.module.css";

const { Content, Sider } = Layout;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const LeaveRequest = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const leaveTypeRef = useRef("");
  const startDateRef = useRef("");
  const endDateRef = useRef("");
  const fileRef = useRef("");
  const remarksRef = useRef("");

  const createLeaveRequest = async () => {
    try {
      const res = await fetchData(
        "/api/leave/request",
        "PUT",
        {
          account_id: userCtx.accountId,
          leave_type: leaveTypeRef.current.value,
          start_date: startDateRef.current.value,
          end_date: endDateRef.current.value,
          file_url: fileRef.current.value,
          remarks: remarksRef.current.value,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        message.success(`Leave request submitted!`);
        console.log(res.data);
      } else {
        message.error(`Error submitting leave application`);
        console.error("Error submitting leave application:", res.data);
      }
    } catch (error) {
      console.error(error);
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
          ></div>
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
                <h3>INSERT LEAVE APPLICATION FORM HRE</h3>
              </div>
              <br />
              <div className="form">
                <input
                  placeholder="type"
                  ref={leaveTypeRef}
                  type="text"
                ></input>
                <input
                  placeholder="start"
                  ref={startDateRef}
                  type="date"
                ></input>
                <input placeholder="end" ref={endDateRef} type="date"></input>
                <input
                  placeholder="remarks"
                  ref={remarksRef}
                  type="text"
                ></input>
                <input placeholder="file" ref={fileRef} type="text"></input>
                <button onClick={createLeaveRequest}>submit</button>
                <br />
                <br />
                {/* <Form
                  {...formItemLayout}
                  variant="filled"
                  style={{
                    maxWidth: 600,
                  }}
                >
                  <Form.Item
                    label="Leave Type"
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <Select ref={leaveTypeRef}>
                      <Select.Option value="ANNUAL">Annual</Select.Option>
                      <Select.Option value="SICK">Sick</Select.Option>
                      <Select.Option value="CHILDCARE">Childcare</Select.Option>
                      <Select.Option value="MATERNITY">Maternity</Select.Option>
                      <Select.Option value="PATERNITY">Paternity</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Start Date"
                    name="start_date"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <DatePicker ref={startDateRef} />
                  </Form.Item>

                  <Form.Item
                    label="End Date"
                    name="end_date"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <DatePicker ref={endDateRef} />
                  </Form.Item>

                  <Form.Item
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      action="/upload.do"
                      listType="picture-card"
                      ref={fileRef}
                    >
                      <button
                        style={{
                          border: 0,
                          background: "none",
                        }}
                        type="button"
                      >
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </button>
                    </Upload>
                  </Form.Item>

                  <Form.Item label="Remarks" name="remarks">
                    <Input.TextArea ref={remarksRef} />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 6,
                      span: 16,
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={createLeaveRequest}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form> */}
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

export default LeaveRequest;
