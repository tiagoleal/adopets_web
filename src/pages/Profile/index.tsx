import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Divider, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import Api from "../../services/api";

import { useAuth } from "../../hooks/auth";

interface Profile {
  id: string;
  name: string;
  password: string;
  newPassword: string;
}

const Profile = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    form.setFieldsValue({
      name: user.name,
    });
  }, []);

  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  const handleSubmit = useCallback(
    async (profile: Profile) => {
      try {
        const FormData = {
          id: user.id,
          email: user.email,
          name: profile.name,
          password: profile.password,
          newPassword: profile.newPassword,
        };

        const response = await Api.put("profile", FormData);
        updateUser(response.data);

        message.success(response.data.message);

        handleClearForm();
        history.push("/product");
      } catch (error) {
        message.error("Validations Fails: check your data!");
      }
    },
    [history, updateUser]
  );

  const handleClearForm = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form
        form={form}
        name="normal_login"
        layout="vertical"
        className="login-form"
        initialValues={{
          size: "large",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
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

        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new Password!" },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="New Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Divider type="vertical" />
          <Button htmlType="button" onClick={handleClearForm}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
