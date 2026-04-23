import React, { useState, useEffect } from "react";
import { Table,  Card, Button } from "antd";
import {  EditOutlined,DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

// Get my todo 
    const getMyTodos =   () => {
       
        const token = localStorage.getItem("jwt");
        setIsProcessing(true);
          axios.get("http://localhost:8000/todo/myTodos", {
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

    // Delete todo
    const deleteTodo = (id) => {
      const token = localStorage.getItem("jwt");
      axios.delete(`http://localhost:8000/todo/deleteTodo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        const{data}=res
      setTodos(prev => prev.filter(todo => todo.id !== id));
       window.toastify(data.message,"success");
      }).catch((error) => {
        console.log(error)
        window.toastify("internal server error","error");
      }) 
    };
  useEffect(() => { 
    getMyTodos();
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
        <Link to={`/dashboard/update-todo/${record.id}`}>
          <Button
            type="text"
            className="text-orange-500 hover:text-orange-600"
            icon={<EditOutlined />}
            
          />
          </Link>
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => deleteTodo(record.id)}
          />
        </div>
      ),
    },
  ];


  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-deep-forest">My Todos</h2>
      <Card className="shadow-lg rounded-3xl border-none">
        <Table dataSource={todos} columns={columns} scroll={{ x: 'max-content' }} rowKey="id" pagination={{ pageSize: 10 }} loading={isProcessing} />
      </Card>
    </div>
  );
};

export default Todos;
