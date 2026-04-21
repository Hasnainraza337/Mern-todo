import React from "react";

const Home = () => {
  const stats = [
    { title: "Total Todos", value: "24", color: "bg-dark-sea-green" },
    { title: "Pending", value: "08", color: "bg-deep-terracotta" },
    { title: "Completed", value: "16", color: "bg-deep-forest" },
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
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-mist/20">
        <h3 className="text-xl font-bold text-deep-forest mb-4">
          Recent Activity
        </h3>
        <p className="text-slate-mist italic">
          Yahan aapki haliya todos ki list nazar aayegi...
        </p>
      </div>
    </>
  );
};

export default Home;
