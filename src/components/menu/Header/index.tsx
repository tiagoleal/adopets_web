import React from "react";

import { Container } from "./styles";

import { Layout, Menu, Dropdown, Avatar } from "antd";
import { ImportOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";

import { useAuth } from "../../../hooks/auth";
const { Header } = Layout;

const HeaderNavbar: React.FC = () => {
  const { signOut, user } = useAuth();

  const name = JSON.stringify(Object.entries(user)[1][1])
    .replace('"', "")
    .replace('"', "");

  const username = JSON.stringify(Object.entries(user)[2][1])
    .replace('"', "")
    .replace('"', "");

  const menu = (
    <Menu>
      <Menu.Item key="2" icon={<ImportOutlined />} onClick={signOut}>
        Sign Out
      </Menu.Item>
      {/* <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd memu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item> */}
    </Menu>
  );

  return (
    <Container>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div style={{ float: "right", border: "none", marginRight: 15 }}>
          <Avatar
            style={{ marginRight: 10 }}
            alt={name}
            icon={<UserOutlined />}
          />
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {username} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Header>
    </Container>
  );
};

export default HeaderNavbar;
