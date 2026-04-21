import React from "react";
import { Form, Input, Button, DatePicker, Select, Card, Tag } from "antd";
import {
  PlusOutlined,
  TagsOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const AddTodos = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Todo Data:", values);
    form.resetFields();
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
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="p-4"
        >
          {/* Task Title */}
          <Form.Item
            name="title"
            label={
              <span className="text-deep-forest font-semibold">Task Title</span>
            }
            rules={[{ required: true, message: "Please enter a title!" }]}
          >
            <Input
              prefix={<FileTextOutlined className="text-dark-sea-green mr-2" />}
              placeholder="e.g. Design Portfolio UI"
              className="h-12 rounded-xl border-slate-mist/30 focus:border-dark-sea-green"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Select */}
            <Form.Item
              name="category"
              label={
                <span className="text-deep-forest font-semibold">Category</span>
              }
            >
              <Select
                placeholder="Select Category"
                className="h-12 rounded-xl"
                suffixIcon={<TagsOutlined className="text-dark-sea-green" />}
              >
                <Option value="work">Work</Option>
                <Option value="personal">Personal</Option>
                <Option value="coding">Coding</Option>
                <Option value="fitness">Fitness</Option>
              </Select>
            </Form.Item>

            {/* Due Date */}
            <Form.Item
              name="dueDate"
              label={
                <span className="text-deep-forest font-semibold">Due Date</span>
              }
            >
              <DatePicker
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
              rows={4}
              placeholder="Describe your task here..."
              className="rounded-xl border-slate-mist/30 focus:border-dark-sea-green"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="mb-0 mt-6">
            <Button
              block
              size="large"
              htmlType="submit"
              icon={<PlusOutlined />}
              className="bg-deep-terracotta! text-white! border-none! h-14 text-lg font-bold rounded-xl shadow-lg hover:scale-[1.02]! hover:shadow-xl transition-all"
            >
              Add to My List
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
