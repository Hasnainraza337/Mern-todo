import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-abstract-white">
      <Card className="w-full max-w-md shadow-xl border-none rounded-2xl overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-deep-forest">Welcome Back</h2>
          <p className="text-slate-mist mt-2">Login to manage your todos</p>
        </div>

        <Form layout="vertical" initialValues={{ remember: true }}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Email is required!" }]}
          >
            <Input
              prefix={<MailOutlined className="text-slate-mist mr-2" />}
              placeholder="Email Address"
              className="h-11 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-mist mr-2" />}
              placeholder="Password"
              className="h-11 rounded-lg"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-6">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-deep-forest">Remember me</Checkbox>
            </Form.Item>
            <Link
              to="/auth/forgot-password"
              title="Reset your password"
              className="text-deep-terracotta hover:text-deep-forest font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <Form.Item>
            <Button
              block
              size="large"
              htmlType="submit"
              className="bg-dark-sea-green! text-white! border-none!  font-bold h-12 rounded-lg shadow-md hover:bg-deep-forest!   transition-all"
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="text-center text-slate-mist">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-dark-sea-green font-bold hover:underline"
            >
              Create Account
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
