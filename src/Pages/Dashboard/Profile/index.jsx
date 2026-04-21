import React from "react";
import { Card, Avatar, Button, Descriptions, Tag, Divider } from "antd";
import {
  UserOutlined,
  EditOutlined,
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const Profile = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Profile Card */}
      <Card className="shadow-xl rounded-3xl border-none overflow-hidden bg-linear-to-r from-deep-forest to-dark-sea-green p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar
            size={120}
            icon={<UserOutlined />}
            className="border-4 border-abstract-white shadow-lg bg-slate-mist"
          />
          <div className="text-center md:text-left text-white">
            <h1 className="text-3xl font-bold">Hasnain Raza</h1>
            <p className="opacity-90 text-lg">MERN Stack Developer</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              <Tag
                color="#ECE8E5"
                className=" text-deep-forest! border-none rounded-full px-4"
              >
                MongoDB
              </Tag>
              <Tag
                color="#ECE8E5"
                className=" text-deep-forest! border-none rounded-full px-4"
              >
                Express.js
              </Tag>
              <Tag
                color="#ECE8E5"
                className=" text-deep-forest! border-none rounded-full px-4"
              >
                React.js
              </Tag>
              <Tag
                color="#ECE8E5"
                className=" text-deep-forest! border-none rounded-full px-4"
              >
                Node.js
              </Tag>
            </div>
          </div>
          <Button
            className="md:ml-auto  bg-abstract-whit!e  text-deep-forest! border-none font-bold rounded-xl h-12 px-8 flex items-center gap-2 hover:scale-105 transition-all"
            icon={<EditOutlined />}
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
              Hasnain Raza
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="font-bold text-slate-mist">Email</span>}
            >
              hasnain@example.com
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className="font-bold text-slate-mist">Location</span>
              }
            >
              Faisalabad, Pakistan
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="font-bold text-slate-mist">Role</span>}
            >
              Administrator
            </Descriptions.Item>
          </Descriptions>
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
