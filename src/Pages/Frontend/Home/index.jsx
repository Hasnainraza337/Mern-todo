import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  CheckCircleOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const Home = () => {
  return (
    <div className="bg-abstract-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-deep-forest mb-6">
          Organize Your Life <br />
          <span className="text-dark-sea-green italic">With Precision.</span>
        </h1>
        <p className="text-slate-mist text-lg max-w-2xl mx-auto mb-10">
          A minimalist task management experience built for developers and
          creative thinkers. Capture ideas, track progress, and achieve more
          every day.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/auth/register">
            <Button
              size="large"
              className="bg-dark-sea-green! text-white! border-none! px-10 h-12 font-bold shadow-lg transition-all duration-300 hover:bg-deep-forest! hover:shadow-xl"
            >
              Get Started Free
            </Button>
          </Link>
          <Link to="/about">
            <Button
              size="large"
              className="border-deep-forest! text-deep-forest! bg-transparent! border-2! px-10 h-12 font-bold transition-all duration-300 hover:bg-deep-forest! hover:text-white! shadow-sm hover:shadow-md"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-deep-forest p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between">
            <RocketOutlined className="text-4xl text-dark-sea-green mb-4 self-start" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Fast Performance</h3>
              <p className="text-slate-mist">
                Built with the MERN stack for real-time updates and seamless
                transitions.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-mist/20">
            <SafetyCertificateOutlined className="text-4xl text-deep-terracotta mb-4" />
            <h3 className="text-xl font-bold text-deep-forest mb-2">
              Secure Data
            </h3>
            <p className="text-slate-mist text-sm">
              Your tasks are protected with industry-standard encryption and
              private routing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
