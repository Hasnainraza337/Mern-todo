import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Avatar, message, Divider } from "antd";
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
  const [state, setState] = useState({
    fullName: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setState({
        fullName: user.fullName || "",
      });
      setPreview(user.avatar || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove profile photo function
  const handleRemovePhoto = async () => {
    try {
      setIsProcessing(true);
      const token = localStorage.getItem("jwt");

      const response = await axios.delete(
        "http://localhost:8000/auth/deleteProfileImage",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPreview("");
      setImage(null);

      dispatch({
        isAuth: true,
        user: { ...user, avatar: "", avatarPublicId: "" },
      });

      message.success(response.data.message || "Profile image removed!");
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Failed to remove image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (state.fullName.trim().length < 3) {
      return message.error("FullName must be at least 3 characters.");
    }
    setIsProcessing(true);

    const formData = new FormData();
    formData.append("fullName", state.fullName);

    if (image) {
      formData.append("avatar", image);
    }

    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.patch(
        "http://localhost:8000/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        <Form layout="vertical" onFinish={handleProfileUpdate}>
          {/* Custom Avatar Upload (Jesey file input hota hai) */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <Avatar
                size={120}
                src={preview ? preview : null}
                icon={!preview ? <UserOutlined /> : null}
                className="border-4 border-dark-sea-green/20 bg-abstract-white shadow-md"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <CameraOutlined className="text-2xl text-white" />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="text-slate-mist text-sm mt-3">
              Click icon to change photo
            </p>
            {preview && (
              <Button
                type="link"
                danger
                loading={isProcessing}
                onClick={handleRemovePhoto}
                className="mt-2 text-xs"
              >
                Remove Photo
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Form.Item
              label={
                <span className="font-semibold text-deep-forest">
                  Full Name
                </span>
              }
            >
              <Input
                name="fullName"
                value={state.fullName}
                onChange={handleChange}
                className="h-11 rounded-xl"
                placeholder="Enter Your Full Name"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-semibold text-deep-forest">
                  Email Address
                </span>
              }
            >
              <Input
                value={user.email}
                disabled
                className="h-11 rounded-xl bg-gray-100"
              />
            </Form.Item>
          </div>

          <Divider className="border-slate-mist/10" />

          <div className="flex justify-end gap-4 mt-6">
            <Button
              size="large"
              onClick={() => navigate(-1)}
              className="rounded-xl px-8"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isProcessing}
              icon={<SaveOutlined />}
              className="bg-deep-forest! border-none! rounded-xl px-10 font-bold"
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
