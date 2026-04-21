import React from "react";
import { Table, Avatar, Tag, Card } from "antd";

const AllTodos = () => {
  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} className="bg-dark-sea-green" />
          <span className="font-medium text-deep-forest">{user.name}</span>
        </div>
      ),
    },
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (p) => (
        <Tag color={p === "High" ? "red" : "green"} border={false}>
          {p}
        </Tag>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      user: { name: "Hasnain Raza", avatar: "" },
      title: "Database Migration",
      priority: "High",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-deep-forest">System-wide Tasks</h2>
      <Card className="shadow-lg rounded-3xl border-none">
        <Table dataSource={data} columns={columns} />
      </Card>
    </div>
  );
};

export default AllTodos;
