import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Card, Tag } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

const initialState = { title: "", dueDate: "", description: "" };

const AddTodos = () => {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const handleDateChange = (date, dateString) => {
    setState((s) => ({ ...s, dueDate: dateString }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAddTodo = () => {
    const { title, dueDate, description } = state;

    const todo = { title, dueDate, description };

    const formData = new FormData();
    for (let key in todo) formData.append(key, todo[key]);
    formData.append("image", image);

    setIsProcessing(true);
    const token = localStorage.getItem("jwt");
    axios
      .post(`${window.API}/todo/add-todo`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { status, data } = res;
        if (status === 201) {
          window.toastify(data.message, "success");
          window.dispatchEvent(new Event("updateNotification"));
          setState(initialState);
        }
      })
      .catch((error) => {
        console.log(error);
        window.toastify("something went wrong ,internal server error", "error");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-deep-forest">Create New Task</h2>
        <p className="text-slate-mist">
          Fill in the details to add a new todo to your list.
        </p>
      </div>

      <Card className="shadow-xl rounded-3xl border-none overflow-hidden bg-white/70 backdrop-blur-md">
        <Form
          layout="vertical"
          onFinish={handleAddTodo}
          autoComplete="off"
          className="p-4"
        >
          {/* Task Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label={
                <span className="text-deep-forest font-semibold">
                  Task Title
                </span>
              }
              rules={[{ required: true, message: "Please enter a title!" }]}
            >
              <Input
                name="title"
                prefix={
                  <FileTextOutlined className="text-dark-sea-green mr-2" />
                }
                placeholder="e.g. Design Portfolio UI"
                className="h-12 rounded-xl border-slate-mist/30 focus:border-dark-sea-green"
                onChange={handleChange}
              />
            </Form.Item>
            {/* Due Date */}
            <Form.Item
              label={
                <span className="text-deep-forest font-semibold">Due Date</span>
              }
            >
              <DatePicker
                name="dueDate"
                onChange={handleDateChange}
                className="w-full h-12 rounded-xl"
                suffixIcon={
                  <CalendarOutlined className="text-dark-sea-green" />
                }
              />
            </Form.Item>
          </div>

          {/* Description */}
          <Form.Item
            name="description"
            label={
              <span className="text-deep-forest font-semibold">
                Description
              </span>
            }
          >
            <TextArea
              name="description"
              rows={4}
              placeholder="Describe your task here..."
              className="rounded-xl border-slate-mist/30 focus:border-dark-sea-green"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="image"
            label={
              <span className="text-deep-forest font-semibold">Image</span>
            }
          >
            <div className="flex items-center gap-3">
              <Input
                name="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              {image && <span className="text-green-600">{image.name}</span>}
            </div>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="mb-0 mt-6">
            <Button
              loading={isProcessing}
              block
              size="large"
              htmlType="submit"
              icon={<PlusOutlined />}
              className="bg-deep-terracotta! text-white! border-none! h-14 text-lg font-bold rounded-xl shadow-lg hover:scale-[1.02]! hover:shadow-xl transition-all"
            >
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Quick Tips (Small Bento Style) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-dark-sea-green/10 p-4 rounded-2xl flex items-center gap-4">
          <Tag color="#347B60" className="m-0 px-3 py-1 rounded-full">
            Pro Tip
          </Tag>
          <p className="text-sm text-deep-forest">
            Break down big tasks into smaller ones.
          </p>
        </div>
        <div className="bg-slate-mist/10 p-4 rounded-2xl flex items-center gap-4">
          <Tag color="#1B332C" className="m-0 px-3 py-1 rounded-full">
            Note
          </Tag>
          <p className="text-sm text-deep-forest">
            Due dates help you stay on track!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddTodos;
