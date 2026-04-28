import React from "react";
import { Menu, Layout, Button } from "antd";
import {
  DashboardOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
  ProfileOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const { handleLogout, user } = useAuthContext();
  const isSuperAdmin = user?.roles?.includes("super-admin");

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
      label: <Link to="/dashboard/add-todo">Add Task</Link>,
    },
    {
      key: "/dashboard/todos",
      icon: <UnorderedListOutlined />,
      label: <Link to="/dashboard/todos">My Tasks</Link>,
    },
    ...(isSuperAdmin
      ? [
          {
            key: "/dashboard/all-todos",
            icon: <UnorderedListOutlined />,
            label: <Link to="/dashboard/all-todos">All Tasks</Link>,
          },
          {
            key: "/dashboard/users",
            icon: <UserOutlined />,
            label: <Link to="/dashboard/users">Users</Link>,
          },
          {
            key: "/dashboard/messages",
            icon: <MessageOutlined />,
            label: <Link to="/dashboard/messages">Messages</Link>,
          },
        ]
      : []),

    {
      key: "/dashboard/setting",
      icon: <SettingOutlined />,
      label: <Link to="/dashboard/setting">Settings</Link>,
    },
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Back to Home Page</Link>,
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="bg-deep-forest!    left-0 top-0 shadow-2xl"
      width={200}
      collapsedWidth={80}
      breakpoint="md"
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 text-center shrink-0">
          <Link
            to="/"
            className="text-xl font-bold transition-all duration-300"
          >
            {collapsed ? (
              <span className="animate-in fade-in zoom-in duration-300">
                <span className="text-abstract-white">T</span>
                <span className="text-dark-sea-green">M</span>
              </span>
            ) : (
              <span className="animate-in fade-in duration-300">
                <span className="text-abstract-white">Task</span>
                <span className="text-dark-sea-green">Manager</span>
              </span>
            )}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar ">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            className="bg-transparent! border-none! custom-sidebar-menu"
            items={menuItems}
            theme="dark"
          />
        </div>

        <div className="p-4 shrink-0 border-t border-white/10">
          <Button
            type="primary"
            size="large"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className={`
            bg-deep-forest! text-abstract-white! border-none! 
            hover:text-white! hover:bg-deep-terracotta! 
            transition-all duration-300 flex items-center justify-center
            ${collapsed ? "w-[45px]" : "w-full"}
            `}
          >
            {!collapsed && <span className="font-semibold">Logout</span>}
          </Button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
