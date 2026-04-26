import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import {
  LockOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`http://localhost:8000/auth/verify-token/${token}`);
      } catch (err) {
        message.toastify("Link is invalid or has expired!", "error");
        navigate("/auth/login");
      }
    };
    verifyToken();
  }, [token]);

  const handleResetPassword = async (values) => {
    setIsProcessing(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/save-new-password",
        {
          token: token,
          newPassword: values.newPassword,
        },
      );

      if (response.status === 200) {
        message.success(
          "Password updated successfully! Redirecting to login...",
        );
        setTimeout(() => navigate("/auth/login"), 1000);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Link expired or invalid!";
      message.toastify(errorMsg, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-abstract-white">
      <Card className="w-full max-w-md shadow-xl border-none rounded-2xl overflow-hidden">
        <div className="text-center mb-8">
          <div className="bg-deep-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-deep-terracotta text-2xl">
            <CheckCircleOutlined />
          </div>
          <h2 className="text-3xl font-bold text-deep-forest">New Password</h2>
          <p className="text-slate-mist mt-2">
            Please enter your new secure password
          </p>
        </div>

        <Form layout="vertical" onFinish={handleResetPassword}>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please enter new password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-mist" />}
              placeholder="New Password"
              className="h-11 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-mist" />}
              placeholder="Confirm New Password"
              className="h-11 rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              size="large"
              htmlType="submit"
              loading={isProcessing}
              className="bg-deep-terracotta! text-white! border-none! font-bold h-12 rounded-lg shadow-md hover:opacity-90!"
            >
              Update Password
            </Button>
          </Form.Item>

          <div className="text-center mt-6">
            <Link
              to="/auth/login"
              className="text-slate-mist hover:text-deep-forest flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeftOutlined /> Back to Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
