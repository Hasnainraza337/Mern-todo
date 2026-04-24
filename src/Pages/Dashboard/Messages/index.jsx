import React, { useEffect, useState } from "react";
import { Table, Button, Avatar, Card } from "antd";
import { UserOutlined, StopOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const getMessages = () => {
    setIsProcessing(true);
    axios
      .get("http://localhost:8000/contact/get-contacts")
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setMessages(data.contacts);
        }
      })
      .catch((error) => {
        window.toastify(
          "Internal Server Error,fecting message failed",
          "error",
        );
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  //   delete messages
  const deleteMessage = (id) => {
    axios
      .delete(`http://localhost:8000/contact/delete-contact/${id}`)
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          window.toastify("Message delete successfully", "success");
          setMessages((prevMessages) =>
            prevMessages.filter((message) => message.id !== id),
          );
        }
      })
      .catch((error) => {
        window.toastify("try again later", "error");
      });
  };

  useEffect(() => {
    getMessages();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          className="rounded-lg"
          onClick={() => deleteMessage(record.id)}
        ></Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-deep-forest">Contact Messages</h2>
      <Card className="shadow-lg rounded-3xl border-none">
        <Table
          dataSource={messages}
          columns={columns}
          scroll={{ x: "max-content" }}
          rowKey="id"
          pagination={{
            pageSize: 5,
            pageSizeOptions: [5, 10, 20, 50, 100],
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          loading={isProcessing}
        />
      </Card>
    </div>
  );
};

export default Messages;
