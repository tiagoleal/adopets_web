import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";

import { Form, message, Input, Button, Avatar } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import { Container, Content } from "./styles";

import Api from "../../services/api";

interface User {
  name: string;
  email: string;
  senha: string;
}

const SignUp = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (values: any) => {
    // console.log("Received values of form: ", values);
    handleSubmit(values);
  };

  const handleSubmit = useCallback(
    async (user: User) => {
      // console.log("data: ", user);
      try {
        const response = await Api.post(`/users/`, user);
        message.success(response.data.message);
        history.push("/");
      } catch (error) {
        message.error(error.message);
      }
    },
    [history]
  );

  return (
    <Container>
      <Content>
        <Avatar
          className="avatar"
          size={64}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your E-mail!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Criar conta
            </Button>
            Ou <Link to="/">Já tenho login</Link>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUp;
