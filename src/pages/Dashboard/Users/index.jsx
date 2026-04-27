import React, { useEffect, useState } from "react";
import { Table, Button, Avatar, Card } from "antd";
import { UserOutlined, StopOutlined } from "@ant-design/icons";
import axios from "axios";
const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const getAllUsers = () => {
    const token = localStorage.getItem("jwt");
    setIsProcessing(true);
    if (token) {
      axios
        .get(`${window.API}/auth/allUsers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { data } = res;
          setAllUsers(data.users);
        })
        .catch(() => window.toastify("Failed to fetch all users", "error"))
        .finally(() => setIsProcessing(false));
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    {
      title: "Profile",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            icon={<UserOutlined />}
            src={record?.avatar && record?.avatar !== "" ? record.avatar : null}
            className="bg-slate-mist border border-gray-200"
          />
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => (
        <span className="capitalize text-dark-sea-green font-medium">
          {Array.isArray(roles) ? roles.join(", ") : roles}
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

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-deep-forest">User Management</h2>
      <Card className="shadow-lg rounded-3xl border-none">
        <Table
          dataSource={allUsers}
          columns={columns}
          scroll={{ x: "max-content" }}
          loading={isProcessing}
        />
      </Card>
    </div>
  );
};

export default Users;
