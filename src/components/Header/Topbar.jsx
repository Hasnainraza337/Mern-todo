import React, { useState, useEffect, useRef } from "react";
import { Avatar, Dropdown, Space, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import notificationSound from "../../assets/audios/notification.mp3";

const TopBar = () => {
  const { user, isAuth, handleLogout } = useAuthContext();
  const [notifications, setNotifications] = useState([]);

  const prevCountRef = useRef(0);

  const playSound = () => {
    const audio = new Audio(notificationSound);
    audio
      .play()
      .catch((err) =>
        console.log("Sound play error (interaction required):", err),
      );
  };

  const fetchNotifications = async (isManual = false) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      const res = await axios.get(
        "http://localhost:8000/notification/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const newNotifications = res.data.notifications || [];
      const currentUnreadCount = newNotifications.filter(
        (n) => !n.isRead,
      ).length;

      if (currentUnreadCount > prevCountRef.current || isManual) {
        if (newNotifications.length > 0) {
          playSound();
        }
      }

      setNotifications(newNotifications);
      prevCountRef.current = currentUnreadCount;
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("jwt");
      await axios.patch(
        `${window.API}/notification/read-all`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      prevCountRef.current = 0;
    } catch (err) {
      message.error("Failed to update notifications");
    }
  };

  useEffect(() => {
    if (isAuth) {
      fetchNotifications();

      const handleManualFetch = () => {
        console.log("Fetching new notifications manually...");
        fetchNotifications(true);
      };

      window.addEventListener("updateNotification", handleManualFetch);

      const interval = setInterval(() => fetchNotifications(false), 30000);

      return () => {
        clearInterval(interval);
        window.removeEventListener("updateNotification", handleManualFetch);
      };
    }
  }, [isAuth]);

  const deleteNotification = async (e, id) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("jwt");
      await axios.delete(`http://localhost:8000/notification/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) => {
        const updated = prev.filter((n) => n._id !== id);
        prevCountRef.current = updated.filter((n) => !n.isRead).length;
        return updated;
      });
      window.toastify("Notification removed", "success");
    } catch (err) {
      console.log(err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const userMenuItems = [
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
    <header className="h-16 bg-white border-b border-slate-mist/30 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1">
        {isAuth && user && (
          <h1 className="text-deep-forest font-semibold text-lg truncate">
            {getGreeting()},{" "}
            <span className="text-dark-sea-green">{user?.fullName}</span>
          </h1>
        )}
      </div>

      <div className="flex items-center space-x-6 shrink-0">
        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          arrow
          menu={{ items: [] }}
          dropdownRender={() => (
            <div className="bg-white shadow-2xl rounded-lg w-80 border border-slate-mist/10 overflow-hidden">
              <div className="p-4 border-b border-slate-mist/10 flex justify-between items-center bg-slate-50/50">
                <span className="font-bold text-deep-forest">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                    className="text-xs cursor-pointer text-dark-sea-green hover:underline font-medium border-none bg-transparent"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className={`p-4 border-b flex gap-3 relative group transition-colors ${
                        !n.isRead ? "bg-slate-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="mt-1">
                        {n.type === "security" ? (
                          <span className="text-red-500 text-lg">🛡️</span>
                        ) : (
                          <span className="text-green-500 text-lg">📝</span>
                        )}
                      </div>

                      <div className="flex-1 pr-6">
                        <p
                          className={`text-sm ${n.type === "security" ? "text-red-700" : "text-slate-800"} ${!n.isRead ? "font-semibold" : ""}`}
                        >
                          {n.message}
                        </p>
                        <span className="text-[10px] opacity-60">
                          {new Date(n.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <button
                        onClick={(e) => deleteNotification(e, n._id)}
                        className="absolute right-2 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 cursor-pointer border-none bg-transparent"
                        title="Delete notification"
                      >
                        <DeleteOutlined style={{ fontSize: "14px" }} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-mist text-sm">
                    No notifications yet
                  </div>
                )}
              </div>
            </div>
          )}
        >
          <button className="text-slate-mist hover:text-dark-sea-green transition-colors relative flex items-center justify-center border-none bg-transparent cursor-pointer">
            <BellOutlined className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-deep-terracotta text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </Dropdown>

        {isAuth && user ? (
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <Space className="cursor-pointer group">
              <Avatar
                size="large"
                icon={<UserOutlined />}
                src={user?.avatar && user?.avatar !== "" ? user.avatar : null}
                className="bg-dark-sea-green group-hover:scale-110 transition-transform"
              />
            </Space>
          </Dropdown>
        ) : null}
      </div>
    </header>
  );
};

export default TopBar;
