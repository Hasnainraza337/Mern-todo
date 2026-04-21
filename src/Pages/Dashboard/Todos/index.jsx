import React from "react";
import { Table, Tag, Space, Button, Card } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const Todos = () => {
  const dataSource = [
    {
      key: "1",
      title: "Portfolio Website Design",
      category: "Coding",
      status: "In Progress",
      date: "2026-04-25",
    },
    {
      key: "2",
      title: "Client Meeting",
      category: "Work",
      status: "Completed",
      date: "2026-04-20",
    },
  ];

  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <span className="text-deep-forest font-semibold">{text}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (cat) => (
        <Tag color="blue" className="rounded-full px-3">
          {cat}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "Completed" ? "#347B60" : "#BC6C25"}
          className="rounded-full px-3"
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <span className="text-slate-mist">{date}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<CheckCircleOutlined className="text-dark-sea-green" />}
          />
          <Button
            type="text"
            icon={<EditOutlined className="text-blue-500" />}
          />
          <Button
            type="text"
            icon={<DeleteOutlined className="text-deep-terracotta" />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-deep-forest">My Tasks</h2>
        <Tag color="#347B60" className="text-lg py-1 px-4 rounded-lg">
          Total: {dataSource.length}
        </Tag>
      </div>

      <Card className="shadow-lg rounded-3xl overflow-hidden border-none">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          className="custom-table"
        />
      </Card>
    </div>
  );
};

export default Todos;
