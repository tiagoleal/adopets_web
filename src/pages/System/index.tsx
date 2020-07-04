import React, { useState, useEffect, useCallback } from "react";

import Api from "../../services/api";

import { Container } from "./styles";

import "antd/dist/antd.css";
import { message, Table, Divider, Typography } from "antd";
const { Title } = Typography;

type SystemLogs = {
  id: number;
  action: string;
  log: string;
  username: string;
  usemail: string;
  created_at: string;
  updated_at: string;
};

const SystemLogs = () => {
  const [logs, setLogs] = useState<SystemLogs[]>([]);

  useEffect(() => {
    onLoadSystemLogs();
  }, []);

  const onLoadSystemLogs = useCallback(
    (params = {}) => {
      try {
        Api.get("logs").then((response) => {
          const logs = response.data.map((systemLog: SystemLogs) => {
            return {
              ...systemLog,
              key: systemLog.id,
            };
          });
          setLogs(logs);
        });
      } catch (error) {
        message.error(error);
      }
    },
    [logs]
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 2,
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
        multiple: 2,
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: {
        compare: (a: any, b: any) => a.email - b.email,
        multiple: 2,
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      sorter: {
        compare: (a: any, b: any) => a.action - b.action,
        multiple: 2,
      },
    },
    {
      title: "Logs",
      dataIndex: "log",
      key: "log",
      width: "25%",
      sorter: {
        compare: (a: any, b: any) => a.log - b.log,
        multiple: 2,
      },
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      sorter: {
        compare: (a: any, b: any) => a.created_at - b.created_at,
        multiple: 2,
      },
    },
    {
      title: "Updated at",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: {
        compare: (a: any, b: any) => a.updated_at - b.updated_at,
        multiple: 2,
      },
    },
  ];

  return (
    <Container>
      <Title className="title" level={4}>
        System Logs
      </Title>
      <Divider type="horizontal" />
      <Table rowKey="id-system-logs" columns={columns} dataSource={logs} />
    </Container>
  );
};

export default SystemLogs;
