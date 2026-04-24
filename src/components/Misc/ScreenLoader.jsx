import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ScreenLoader = ({ tip = "Connecting to Nature..." }) => {
  const deepForest = "#1B332C";
  const darkSeaGreen = "#347B60";
  const abstractWhite = "#ECE8E5";
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 64,
        color: darkSeaGreen,
      }}
      spin
    />
  );

  return (
    <div
      className="fixed inset-0  flex flex-col items-center justify-center backdrop-blur-sm"
      style={{
        background: `radial-gradient(circle, ${abstractWhite} 0%, rgba(236, 232, 229, 0.8) 100%)`, // Modern gradient
      }}
    >
      <div className="flex flex-col items-center gap-6 p-10 rounded-full">
        <div className="relative">
          <Spin indicator={antIcon} />
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-25"
            style={{ backgroundColor: darkSeaGreen }}
          ></div>
        </div>

        <div className="text-center">
          <p
            className="text-2xl font-extrabold uppercase tracking-widest"
            style={{ color: deepForest }}
          >
            Hasnain<span style={{ color: darkSeaGreen }}>Raza</span>
          </p>
          <p
            className="text-sm font-semibold italic mt-2"
            style={{ color: "#7A8C87" }}
          >
            {tip}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreenLoader;
