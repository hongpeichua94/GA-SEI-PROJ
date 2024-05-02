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
import dayjs from "dayjs";

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

  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [remarks, setRemarks] = useState("");

  const createLeaveRequest = async (values) => {
    const formattedStartDate = dayjs(values.start_date).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(values.end_date).format("YYYY-MM-DD");

    try {
      const res = await fetchData(
        "/api/leave/request",
        "PUT",
        {
          account_id: userCtx.accountId,
          leave_type: values.leave_type,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          // file_url: values.file_url,
          remarks: values.remarks,
        },
        userCtx.accessToken
      );

      if (res.ok) {
        message.success(`Leave request submitted!`);
        // console.log(res.data);
      } else {
        // message.error(res.data);
        console.error("Error submitting leave application:", res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    createLeaveRequest(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
              <div className="row" style={{ textAlign: "center" }}>
                <h4>Request Time Off</h4>
              </div>
              <br />
              <div className="form">
                <Form
                  {...formItemLayout}
                  variant="filled"
                  style={{
                    maxWidth: 600,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Leave Type"
                    name="leave_type"
                    rules={[
                      {
                        required: true,
                        message: "Please select an option!",
                      },
                    ]}
                    value={leaveType}
                    onMetaChange={(e) => setLeaveType(e.target.value)}
                  >
                    <Select>
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
                        message: "Please input start date!",
                      },
                    ]}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  >
                    <DatePicker />
                  </Form.Item>

                  <Form.Item
                    label="End Date"
                    name="end_date"
                    rules={[
                      {
                        required: true,
                        message: "Please input end date!",
                      },
                    ]}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  >
                    <DatePicker />
                  </Form.Item>

                  {/* <Form.Item
                    label="Upload"
                    name="file_url"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                  >
                    <Upload action="/upload.do" listType="picture-card">
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
                  </Form.Item> */}

                  <Form.Item
                    label="Remarks"
                    name="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  >
                    <Input.TextArea />
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
                </Form>
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
