import React, { useState } from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/Header/Topbar";
import Home from "./Home";
import AddTodos from "./AddTodos";
import Todos from "./Todos";
import AllTodos from "./AllTodos";
import Users from "./Users";
import NoPage from "@/components/Misc/NoPage";
import Profile from "./Profile";
import Setting from "./Setting";
import EditProfile from "./EditProfile";
import EditTodo from "./EditTodo";
import Messages from "./Messages";
import { useAuthContext } from "@/context/AuthContext";
import { Route, Routes } from "react-router-dom";

const { Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthContext();

  const isSuperAdmin = user?.roles?.includes("super-admin");

  return (
    <Layout className="min-h-screen bg-abstract-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout className="bg-transparent">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-mist/20 flex items-center px-4 sticky top-0 z-10 justify-between">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-deep-forest! text-lg hidden! sm:block!"
          />
          <TopBar />
        </header>

        {/* Main Content Area */}
        <Content className="p-6 md:p-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<EditProfile />} />
            <Route path="/add-todo" element={<AddTodos />} />
            <Route path="/todos" element={<Todos />} />
            {isSuperAdmin && (
              <>
                <Route path="/all-todos" element={<AllTodos />} />
                <Route path="/users" element={<Users />} />
                <Route path="/messages" element={<Messages />} />
              </>
            )}
            <Route path="/update-todo/:id" element={<EditTodo />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
