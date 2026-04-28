import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Card,
  Spin,
  message,
  Upload,
} from "antd";
import {
  SaveOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const EditTodo = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [getTodo, setGetTodo] = useState(true);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    axios
      .get(`${window.API}/todo/singleTodo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const todo = res.data.todo;
        form.setFieldsValue({
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate ? dayjs(todo.dueDate) : null,
        });
        if (todo.imageURL) {
          setFileList([{ url: todo.imageURL, name: "Current Image" }]);
        }
      })
      .finally(() => setGetTodo(false));
  }, [id, form]);

  const handleUpdate = (values) => {
    const token = localStorage.getItem("jwt");
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append(
      "dueDate",
      values.dueDate ? values.dueDate.format("YYYY-MM-DD") : "",
    );

    // Agar nayi file select ki gayi hai
    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    setIsProcessing(true);

    axios
      .patch(`${window.API}/todo/updateTodo/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        window.toastify(res.data.message, "success");
        navigate("/dashboard/todos");
      })
      .catch(() => window.toastify("Update failed", "error"))
      .finally(() => setIsProcessing(false));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="border-slate-mist/30 text-deep-forest"
        />
        <h2 className="text-3xl font-bold text-deep-forest">Edit Task</h2>
      </div>

      <Card className="shadow-2xl rounded-3xl border-none bg-white/80 backdrop-blur-md p-4 min-h-[300px]">
        {getTodo ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
            autoComplete="off"
          >
            <Form.Item
              name="title"
              label={
                <span className="text-deep-forest font-semibold">
                  Task Title
                </span>
              }
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input className="h-12 rounded-xl border-slate-mist/30" />
            </Form.Item>

            <Form.Item
              name="dueDate"
              label={
                <span className="text-deep-forest font-semibold">Due Date</span>
              }
            >
              <DatePicker className="w-full h-12 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="description"
              label={
                <span className="text-deep-forest font-semibold">
                  Description
                </span>
              }
            >
              <Input.TextArea
                rows={4}
                className="rounded-xl border-slate-mist/30"
              />
            </Form.Item>
            <Form.Item label="Update Image">
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false}
                onChange={({ fileList }) => setFileList(fileList)}
                maxCount={1}
              >
                {fileList.length < 1 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <div className="flex justify-end gap-4 mt-6">
              <Button onClick={() => navigate(-1)} className="rounded-xl px-8">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isProcessing}
                className="bg-deep-forest! border-none! rounded-xl px-10 font-bold"
              >
                Update Todo
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default EditTodo;
