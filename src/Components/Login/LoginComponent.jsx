import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { requestAPI } from "../../utlis/utils";
import "./LoginComponent.css";

export const LoginComponent = () => {
  const onLogin = (values) => {
    document.getElementById("loader").style.display = "block";
    requestAPI("POST", "/login", values, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        localStorage.setItem('authToken', res.data.authToken);
        window.location.href = '/todo';
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        alert(err.response.data);
      });
  };

  return (
    <div className="form-cmp">
        <h1 className="login">Login</h1>
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
        onFinish={onLogin}
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
      <Link to='/signup'><p>Click here to SignUp</p></Link>
      </div>
    </div>
  );
};
