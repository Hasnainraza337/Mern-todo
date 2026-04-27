import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { fullName, email, password, confirmPassword } = state;
    const userData = { fullName, email, password };

    if (confirmPassword !== password) {
      return window.toastify("Password not match", "error");
    }

    axios
      .post(`${window.API}/auth/register`, userData)
      .then((res) => {
        const { status, data } = res;
        if (status === 201) {
          window.toastify(data.message, "success");
          setState(initialState);
          navigate("/auth/login");
        } else {
          window.toastify(data.message, "error");
        }
      })
      .catch((err) => {
        window.toastify(
          err?.response?.data?.message || "Something went wrong",
          "error",
        );
      });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-abstract-white">
      <Card className="w-full max-w-lg shadow-xl border-none rounded-2xl overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-deep-forest">
            Create Account
          </h2>
          <p className="text-slate-mist mt-2">Join us and stay organized</p>
        </div>

        <Form layout="vertical">
          <Form.Item
            name="name"
            label={
              <span className="text-deep-forest font-medium">Full Name</span>
            }
          >
            <Input
              type="text"
              name="fullName"
              prefix={<UserOutlined className="text-slate-mist" />}
              placeholder="Enter your Full Name"
              className="h-11 rounded-lg"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <span className="text-deep-forest font-medium">
                Email Address
              </span>
            }
          >
            <Input
              type="email"
              name="email"
              prefix={<MailOutlined className="text-slate-mist" />}
              placeholder="Enter your Email Address"
              className="h-11 rounded-lg"
              onChange={handleChange}
            />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item
              name="password"
              label={
                <span className="text-deep-forest font-medium">Password</span>
              }
            >
              <Input.Password
                name="password"
                prefix={<LockOutlined className="text-slate-mist" />}
                placeholder="At least 6 characters"
                className="h-11 rounded-lg"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label={
                <span className="text-deep-forest font-medium">
                  Confirm Password
                </span>
              }
            >
              <Input.Password
                name="confirmPassword"
                prefix={<LockOutlined className="text-slate-mist" />}
                placeholder="At least 6 characters"
                className="h-11 rounded-lg"
                onChange={handleChange}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              block
              size="large"
              htmlType="submit"
              className="bg-deep-forest! text-white! border-none! font-bold h-12 rounded-lg mt-4 hover:bg-dark-sea-green! transition-all"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center text-slate-mist">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-dark-sea-green font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
