import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const NoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-99999 bg-abstract-white flex items-center justify-center p-6 overflow-hidden">
      {/* Background Abstract Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-dark-sea-green/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-deep-forest/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl text-center">
        {/* Floating Icon Section */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white shadow-2xl shadow-deep-forest/10 rounded-2rem flex items-center justify-center border border-white/50 animate-bounce duration-3000ms">
            <ExclamationCircleOutlined className="text-4xl text-dark-sea-green" />
          </div>
        </div>

        {/* 404 Typography */}
        <h1 className="text-8xl md:text-[10rem] font-black text-deep-forest leading-none mb-4 tracking-tighter opacity-10">
          404
        </h1>

        <div className="space-y-4 -mt-16 md:-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-forest tracking-tight">
            Lost in the Forest<span className="text-dark-sea-green">.</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-sm mx-auto leading-relaxed">
            The page you are looking for has been moved or doesn't exist in our
            Task Manager.
          </p>
        </div>

        {/* Professional Buttons Group */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="h-14 px-8 rounded-2xl border-2 border-slate-200 text-deep-forest font-semibold hover:border-dark-sea-green! hover:text-dark-sea-green! transition-all duration-300 w-full sm:w-auto"
          >
            Go Back
          </Button>

          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate("/dashboard")}
            className="h-14 px-10 rounded-2xl bg-deep-forest! border-none! text-white font-bold shadow-xl shadow-deep-forest/20 hover:bg-dark-sea-green! hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
          >
            Return to Dashboard
          </Button>
        </div>

        {/* Bottom Small Text */}
        <p className="mt-12 text-xs font-medium text-slate-400 uppercase tracking-[0.2em]">
          Error Code: Task_Not_Found
        </p>
      </div>
    </div>
  );
};

export default NoPage;
