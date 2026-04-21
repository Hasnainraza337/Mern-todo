import React from "react";
import { Menu, Layout } from "antd";
import {
  DashboardOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Home</Link>,
    },
    {
      key: "/dashboard/profile",
      icon: <ProfileOutlined />,
      label: <Link to="/dashboard/profile">Profile</Link>,
    },
    {
      key: "/dashboard/add-todo",
      icon: <PlusCircleOutlined />,
      label: <Link to="/dashboard/add-todo">Add Todos</Link>,
    },
    {
      key: "/dashboard/todos",
      icon: <UnorderedListOutlined />,
      label: <Link to="/dashboard/todos">My Todos</Link>,
    },
    {
      key: "/dashboard/all-todos",
      icon: <UnorderedListOutlined />,
      label: <Link to="/dashboard/all-todos">All Todos</Link>,
    },
    {
      key: "/dashboard/users",
      icon: <UserOutlined />,
      label: <Link to="/dashboard/users">Users</Link>,
    },
    {
      key: "/dashboard/setting",
      icon: <SettingOutlined />,
      label: <Link to="/dashboard/setting">Settings</Link>,
    },
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Back to Website</Link>,
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="bg-deep-forest! min-h-screen sticky left-0 top-0 shadow-2xl"
      width={260}
    >
      <div className="p-6 text-center">
        <h2
          className={`text-xl font-bold transition-all duration-300 ${collapsed ? "scale-0" : "scale-100"}`}
        >
          <span className="text-abstract-white">My</span>
          <span className="text-dark-sea-green">Todos</span>
        </h2>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        className="bg-transparent! border-none! custom-sidebar-menu"
        items={menuItems}
        theme="dark"
      />

      <div className="absolute bottom-6 w-full px-4">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl text-abstract-white/70 hover:text-white hover:bg-deep-terracotta transition-all duration-300 overflow-hidden">
          <LogoutOutlined className="text-lg" />
          {!collapsed && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </Sider>
  );
};

export default Sidebar;
