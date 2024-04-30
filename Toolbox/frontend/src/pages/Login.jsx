import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

import { ToolTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";

const Login = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Title } = Typography;

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = async () => {
    const res = await fetchData("/auth/login", "POST", { email, password });

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      userCtx.setAccountId(res.data.account_id);
      userCtx.setRole(res.data.role);
      const decoded = jwtDecode(res.data.access);
      userCtx.setRole(decoded.role);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <div className="login-container">
        <Title style={{ textAlign: "center" }}>
          Hi, Welcome to Toolbox
          <ToolTwoTone />
        </Title>
        <div className="login-form">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              <Input.Password />
            </Form.Item>
            <br />

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={handleLogin}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
