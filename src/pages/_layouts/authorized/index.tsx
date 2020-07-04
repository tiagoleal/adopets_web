import React from "react";

import "antd/dist/antd.css";
import { Container } from "./styles";

import HeaderNavbar from "../../../components/menu/Header";
import Sidebar from "../../../components/menu/Sidebar";

import { Layout, Breadcrumb } from "antd";
const { Content, Footer } = Layout;

const authorized: React.FC = ({ children }) => {
  // console.log(JSON.stringify(children));

  return (
    <Container>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout">
          <HeaderNavbar />
          <Content style={{ padding: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Adopets</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/product">Product</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Container>
  );
};

export default authorized;
