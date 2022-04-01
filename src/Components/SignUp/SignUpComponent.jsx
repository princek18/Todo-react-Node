import React from "react";
import { Button, Form, Input } from "antd";
import "./SignUpComponent.css";
import { requestAPI } from "../../utlis/utils";
import { Link } from "react-router-dom";

export const SignUpComponent = () => {
  const onSignUp = (values) => {
    document.getElementById("loader").style.display = "block";
      requestAPI('POST', '/signup', values, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        if (res.status === 200) {
            setTimeout(() => {
            window.location.href = '/login';
            }, 2000)
        }
          alert(res.data);
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
          alert(err.response.data);
      })
  };
  return (
    <div className="form-cmp-s">
        <h1 className="login">Sign Up</h1>

      <Form
      className="frm"
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onSignUp}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your First Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type="email" />
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
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="login">
      <Link to='/login'>Click here to Login</Link>

      </div>
    </div>
  );
};
