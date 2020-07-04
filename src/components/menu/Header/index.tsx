import React, { useState } from "react";
import { Container } from "./styles";

import { Layout, Menu, Dropdown, Avatar, Drawer } from "antd";
import { ImportOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";

import Profile from "../../../pages/Profile";

import { useAuth } from "../../../hooks/auth";
const { Header } = Layout;

const HeaderNavbar: React.FC = () => {
  const { signOut, user } = useAuth();
  const [visibleShowDrawer, setVisibleDrawer] = useState(false);

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />} onClick={showDrawer}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<ImportOutlined />} onClick={signOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div style={{ float: "right", border: "none", marginRight: 15 }}>
          <Avatar
            style={{ marginRight: 10 }}
            alt={user.name}
            icon={<UserOutlined />}
          />
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {user.email} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Header>
      <Drawer
        title="Edit Profile"
        placement="right"
        closable={false}
        onClose={onCloseDrawer}
        visible={visibleShowDrawer}
      >
        <Profile />
      </Drawer>
    </Container>
  );
};

export default HeaderNavbar;
