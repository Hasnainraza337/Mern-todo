import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import {
  MailOutlined,
  ArrowLeftOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleForgotPassword = async (values) => {
    setIsProcessing(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/reset-password",
        {
          email: values.email,
        },
      );

      if (response.status === 200) {
        window.toastify("Reset link sent to your email!", "success");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      window.toastify(errorMsg, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-abstract-white">
      <Card className="w-full max-w-md shadow-xl border-none rounded-2xl overflow-hidden">
        <div className="text-center mb-8">
          <div className="bg-deep-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-deep-terracotta text-2xl">
            <LockOutlined />
          </div>
          <h2 className="text-3xl font-bold text-deep-forest">
            Reset Password
          </h2>
          <p className="text-slate-mist mt-2">
            Enter your email to receive recovery link
          </p>
        </div>

        <Form layout="vertical" onFinish={handleForgotPassword}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Enter a valid email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-slate-mist" />}
              placeholder="Your Email"
              className="h-11 rounded-lg"
              disabled={isProcessing}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isProcessing}
              htmlType="submit"
              block
              size="large"
              className="bg-deep-terracotta! text-white! border-none! font-bold h-12 rounded-lg shadow-md hover:opacity-90!"
            >
              Send Reset Link
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

export default ForgotPassword;
