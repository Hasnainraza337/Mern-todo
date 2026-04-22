import React from "react";
import { Avatar, Dropdown, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { user, isAuth, handleLogout } = useAuthContext();
  const items = [
    {
      key: "1",
      label: <Link to="/dashboard/profile">My Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <Link to="/dashboard/setting">Settings</Link>,
      icon: <SettingOutlined />,
    },
    { type: "divider" },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-mist/30 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search ya Welcome Message */}
      <div className="hidden sm:block">
        <h1 className="text-deep-forest font-semibold text-lg">
          Welcome back,{" "}
          <span className="text-dark-sea-green">{user?.fullName}</span>
        </h1>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-6 ml-auto">
        <button className="text-slate-mist hover:text-dark-sea-green transition-colors relative">
          <BellOutlined className="text-xl" />
          <span className="absolute -top-1 -right-1 bg-deep-terracotta text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        {isAuth && (
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Space className="cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-deep-forest leading-none">
                  {user?.fullName}
                </p>
              </div>
              <Avatar
                size="large"
                icon={<UserOutlined />}
                className="bg-dark-sea-green group-hover:scale-110 transition-transform"
              />
            </Space>
          </Dropdown>
        )}
      </div>
    </header>
  );
};

export default TopBar;
