import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  message,
  Space,
  Divider,
} from "antd";
import {
  UserOutlined,
  CameraOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProfileUpdate = async (values) => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.patch(
        "http://localhost:8000/auth/update-profile",
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      dispatch({ isAuth: true, user: response.data.user });
      message.success("Profile updated successfully!");
      navigate("/dashboard/profile");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to update profile",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="border-slate-mist/30 text-deep-forest"
        />
        <h2 className="text-3xl font-bold text-deep-forest">Edit Profile</h2>
      </div>

      <Card className="shadow-2xl rounded-3xl border-none overflow-hidden bg-white/80 backdrop-blur-sm p-2 md:p-6">
        <Form
          layout="vertical"
          initialValues={{
            fullName: user?.fullName,
            email: user?.email,
          }}
          onFinish={handleProfileUpdate}
        >
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group cursor-pointer">
              <Avatar
                size={120}
                icon={<UserOutlined />}
                src={user?.avatar}
                className="border-4 border-dark-sea-green/20 bg-abstract-white shadow-md group-hover:opacity-80 transition-all"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <CameraOutlined className="text-2xl text-deep-forest" />
              </div>
            </div>
            <p className="text-slate-mist text-sm mt-3">
              Click to change photo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Form.Item
              name="fullName"
              label={
                <span className="font-semibold text-deep-forest">
                  Full Name
                </span>
              }
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input className="h-11 rounded-xl" placeholder="Hasnain Raza" />
            </Form.Item>

            <Form.Item
              name="email"
              label={
                <span className="font-semibold text-deep-forest">
                  Email Address
                </span>
              }
            >
              <Input
                className="h-11 rounded-xl bg-gray-50"
                disabled
                title="Email cannot be changed"
              />
            </Form.Item>
          </div>

          {/* <Form.Item
            name="location"
            label={
              <span className="font-semibold text-deep-forest">Location</span>
            }
          >
            <Input
              className="h-11 rounded-xl"
              placeholder="Faisalabad, Pakistan"
            />
          </Form.Item> */}

          {/* <Form.Item
            name="bio"
            label={
              <span className="font-semibold text-deep-forest">Short Bio</span>
            }
          >
            <Input.TextArea
              rows={4}
              className="rounded-xl"
              placeholder="Tell us a bit about yourself..."
            />
          </Form.Item> */}

          <Divider className="border-slate-mist/10" />

          <div className="flex justify-end gap-4 mt-6">
            <Button
              size="large"
              onClick={() => navigate(-1)}
              className="rounded-xl px-8 border-slate-mist text-slate-mist hover:text-deep-forest"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isProcessing}
              icon={<SaveOutlined />}
              className="bg-deep-forest! border-none! rounded-xl px-10 font-bold shadow-lg hover:scale-105 transition-all"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfile;
