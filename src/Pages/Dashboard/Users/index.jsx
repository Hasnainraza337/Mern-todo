import React, { useEffect, useState } from "react";
import { Table, Button, Avatar, Card } from "antd";
import { UserOutlined, StopOutlined } from "@ant-design/icons";
import axios from "axios";
const Users = () => {

const [allUsers, setAllUsers] = useState([]);
const [isProcessing, setIsProcessing] = useState(false);




  const getAllUsers = async () => {
    
    const token = localStorage.getItem("jwt");
    setIsProcessing(true);
      if (token) {
        const response = await axios.get("http://localhost:8000/auth/allUsers", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res )=>{
          const {data}=res
          setAllUsers(data.users);
        })
        .catch(()=>
           window.toastify("Failed to fetch all users","error")
        )
        .finally(()=>setIsProcessing(false));
      }
    
  };
useEffect(() => {
  getAllUsers();
}, []);

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
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
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
          {roles}
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
        <Table dataSource={allUsers} columns={columns} scroll={{x:"max-content"}} loading={isProcessing} />
      </Card>
    </div>
  );
};

export default Users;
