import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentTodos, setRecentTodos] = useState([]);

  const getMyTodos = () => {
    const token = localStorage.getItem("jwt");
    setIsProcessing(true);
    axios
      .get(`${window.API}/todo/myTodos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { data } = res;
        setTodos(data?.todos);
      })
      .catch((error) => {
        console.error("Failed to fetch todos:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  // Recent Todo
  const getRecentTodos = () => {
    const token = localStorage.getItem("jwt");
    setIsProcessing(true);
    axios
      .get(`${window.API}/todo/recentTodos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { data } = res;
        setRecentTodos(data?.todos || []);
      })
      .catch((error) => {
        console.error("Failed to fetch todos:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    getMyTodos();
    getRecentTodos();
  }, []);

  const stats = [
    {
      title: "Total Todos",
      value: isProcessing ? "Loading..." : todos?.length,
      color: "bg-dark-sea-green",
    },
    {
      title: "Pending",
      value: isProcessing
        ? "Loading..."
        : todos?.filter((todo) => !todo.completed).length,
      color: "bg-deep-terracotta",
    },
    {
      title: "Completed",
      value: isProcessing
        ? "Loading..."
        : todos?.filter((todo) => todo.completed).length,
      color: "bg-deep-forest",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-deep-forest">
          Dashboard Overview
        </h2>
        <p className="text-slate-mist">
          Manage your tasks and user activity here.
        </p>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-8 rounded-3xl text-white shadow-lg transform hover:-translate-y-1 transition-all`}
          >
            <p className="text-sm opacity-80 uppercase tracking-wider font-bold">
              {stat.title}
            </p>
            <h3 className="text-4xl font-extrabold mt-2">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Content Box */}
      <div className="bg-white rounded-3xl p-2 sm:p-8 shadow-sm border border-slate-mist/20">
        <h3 className="text-xl font-bold text-deep-forest mb-4">
          Recent Activity (Today)
        </h3>

        {recentTodos.length > 0 ? (
          <div className="space-y-4">
            {recentTodos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-deep-forest">
                    {todo.title}
                  </h4>
                  <p className="text-sm text-slate-mist">
                    {todo.description || "No description"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${todo.isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                >
                  {todo.isCompleted ? "Done" : "Active"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-mist italic">
            Aaj koi naya todo add nahi kiya gaya.
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
