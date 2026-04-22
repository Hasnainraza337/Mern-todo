import React from "react";
import { Table, Button, Avatar, Card } from "antd";
import { UserOutlined, StopOutlined } from "@ant-design/icons";
import { useAuthContext } from "@/context/AuthContext";

const Users = () => {
  const columns = [
    {
      title: "Profile",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} className="bg-slate-mist" />
          <span className="font-bold text-deep-forest">{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span className="capitalize text-dark-sea-green font-medium">
          {role}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button danger icon={<StopOutlined />} className="rounded-lg">
          Block User
        </Button>
      ),
    },
  ];

  const usersData = [
    {
      key: "1",
      name: "Hasnain Raza",
      email: "hasnain@example.com",
      role: "admin",
    },
    { key: "2", name: "Zain Ali", email: "zain@example.com", role: "user" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-deep-forest">User Management</h2>
      <Card className="shadow-lg rounded-3xl border-none">
        <Table dataSource={usersData} columns={columns} />
      </Card>
    </div>
  );
};

export default Users;
