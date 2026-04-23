import React, { useState, useEffect } from "react";
import { Table,  Card, Space, Button } from "antd";
import {  EditOutlined,DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const AllTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);


    const getAllTodos =   () => {
       
        const token = localStorage.getItem("jwt");
        setIsProcessing(true);
          axios.get("http://localhost:8000/todo/allTodos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res)=>{
          const{data}=res
          setTodos(data?.todos);
        }).catch((error)=>{
          console.error("Failed to fetch todos:", error);
        }).finally(()=>{
          setIsProcessing(false);
        });
        
       
    };
  useEffect(() => {
    getAllTodos();
  }, []);

  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="text"
            className="text-orange-500 hover:text-orange-600"
            icon={<EditOutlined />}
            
          />
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];


  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-deep-forest">All Todos</h2>
      <Card className="shadow-lg rounded-3xl border-none">
        <Table dataSource={todos} columns={columns} scroll={{ x: 'max-content' }} rowKey="id" pagination={{ pageSize: 10 }} loading={isProcessing} />
      </Card>
    </div>
  );
};

export default AllTodos;
