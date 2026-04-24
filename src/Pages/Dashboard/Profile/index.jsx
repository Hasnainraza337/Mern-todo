import React, { useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Descriptions,
  Tag,
  Divider,
  Popconfirm,
  message,
  Modal,
  Image,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  DeleteOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "@/context/AuthContext";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { dispatch, user } = useAuthContext();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const token = localStorage.getItem("jwt");
    axios
      .delete("http://localhost:8000/auth/delete-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ isAuth: false, user: null });
        localStorage.removeItem("jwt");
        navigate("/");
        message.success("Account deleted successfully");
      })
      .catch((error) => {
        message.error("Failed to delete account");
      });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Profile Card */}
      <Card className="shadow-xl rounded-3xl border-none overflow-hidden bg-linear-to-r from-deep-forest to-dark-sea-green p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar
            size={120}
            icon={<UserOutlined />}
            src={user?.avatar && user?.avatar !== "" ? user.avatar : null}
            className="border-4 border-abstract-white shadow-lg bg-slate-mist cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() =>
              user?.avatar && user?.avatar !== "" && setIsPreviewOpen(true)
            }
          />
          {/* Preview Modal */}
          <Modal
            open={isPreviewOpen}
            footer={null}
            onCancel={() => setIsPreviewOpen(false)}
            centered
            styles={{ body: { padding: 0 } }}
            width={400}
          >
            <Image alt="Avatar Preview" src={user?.avatar} />
          </Modal>

          <div className="text-center md:text-left text-deep-forest">
            <h1 className="text-3xl font-bold">{user?.fullName}</h1>
            <p className="opacity-90 text-lg">{user?.roles?.join(", ")}</p>
          </div>
          <Button
            className="md:ml-auto  bg-abstract-white!  text-deep-forest! border-none font-bold rounded-xl h-12 px-8 flex items-center gap-2 hover:scale-105 transition-all"
            icon={<EditOutlined />}
            onClick={() => navigate("/dashboard/update-profile")}
          >
            Edit Profile
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card
          title="Personal Information"
          className="md:col-span-2 shadow-sm rounded-3xl border-none"
        >
          <Descriptions column={1} layout="horizontal">
            <Descriptions.Item
              label={
                <span className="font-bold text-slate-mist">Full Name</span>
              }
            >
              {user?.fullName}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="font-bold text-slate-mist">Email</span>}
            >
              {user?.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="font-bold text-slate-mist">Location</span>
              }
            >
              {user?.location || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="font-bold text-slate-mist">Role</span>}
            >
              {user?.roles?.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="font-bold text-slate-mist">Join On</span>}
            >
              {user?.createdAt
                ? dayjs(user.createdAt).format("DD MMM YYYY")
                : "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card className="shadow-sm rounded-3xl border-2 border-red-100 bg-red-50/30">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <h4 className="text-red-600 font-bold flex items-center justify-center gap-2">
                <WarningOutlined /> Danger Zone
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                This action cannot be undone.
              </p>
            </div>

            <Popconfirm
              title="Delete Account"
              description="Are you sure you want to delete your account permanently?"
              onConfirm={handleDeleteAccount}
              okText="Yes, Delete"
              cancelText="No"
              okButtonProps={{ danger: true, loading: false }}
              icon={<WarningOutlined style={{ color: "red" }} />}
            >
              <Button
                danger
                type="primary"
                ghost
                block
                icon={<DeleteOutlined />}
                className="rounded-xl border-red-400"
              >
                Delete Account
              </Button>
            </Popconfirm>
          </div>
        </Card>
        {/* Social Links */}
        <Card title="Connect" className="shadow-sm rounded-3xl border-none">
          <div className="space-y-4">
            <a
              href="#"
              className="flex items-center gap-3 text-deep-forest hover:text-dark-sea-green transition-colors"
            >
              <GithubOutlined className="text-xl" /> <span>GitHub</span>
            </a>
            <Divider className="my-2" />
            <a
              href="#"
              className="flex items-center gap-3 text-deep-forest hover:text-dark-sea-green transition-colors"
            >
              <LinkedinOutlined className="text-xl" /> <span>LinkedIn</span>
            </a>
            <Divider className="my-2" />
            <a
              href="#"
              className="flex items-center gap-3 text-deep-forest hover:text-dark-sea-green transition-colors"
            >
              <GlobalOutlined className="text-xl" /> <span>Portfolio</span>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
