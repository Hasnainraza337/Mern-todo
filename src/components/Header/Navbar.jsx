import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { isAuth } = useAuthContext();

  return (
    <nav className="bg-deep-forest px-6 py-4 flex justify-between items-center shadow-lg relative">
      {/* 1. Logo (Left Side) */}
      <div className="text-abstract-white text-2xl font-bold tracking-wider shrink-0">
        <Link to="/">
          Task<span className="text-dark-sea-green">Manager</span>
        </Link>
      </div>

      {/* 2. Desktop Links & Buttons (Right Side) */}
      <div className="hidden md:flex items-center space-x-10 ml-auto">
        {/* Navigation Links */}
        <div className="flex space-x-8 text-abstract-white font-medium">
          <Link
            to="/"
            className="hover:text-dark-sea-green transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-dark-sea-green transition-all duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-dark-sea-green transition-all duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {!isAuth ? (
            <>
              <Link to="/auth/login">
                <Button
                  type="text"
                  className="text-abstract-white! hover:text-dark-sea-green! border-none font-semibold"
                >
                  Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button className="bg-dark-sea-green! text-abstract-white! border-none px-6 font-bold hover:opacity-90! shadow-md transition-all rounded-md">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button
                    className="
          bg-dark-sea-green! 
          text-abstract-white! 
          border-none 
          px-8 
          py-5 
          font-bold 
          rounded-full 
          shadow-[0_4px_14px_0_rgb(60,100,80,0.39)] 
          hover:shadow-[0_6px_20px_rgba(60,100,80,0.23)] 
          hover:scale-105 
          active:scale-95 
          transition-all 
          duration-300 
          flex 
          items-center 
          gap-2"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-abstract-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-abstract-white"></span>
                    </span>
                    Dashboard
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Mobile Menu Icon (Show only on < md) */}
      <div className="md:hidden">
        <Button
          className="text-abstract-white! border-none! bg-transparent! text-xl flex items-center"
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="text-xl font-bold tracking-wider">
            <Link to="/">
              <span className="text-deep-forest">Task</span>
              <span className="text-dark-sea-green">Manager</span>
            </Link>
          </div>
        }
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        styles={{ body: { backgroundColor: "#ECE8E5" } }}
        size={280}
      >
        <div className="flex flex-col space-y-6">
          <Link
            to="/"
            onClick={() => setVisible(false)}
            className="text-deep-forest text-lg font-semibold border-b border-slate-mist pb-2"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setVisible(false)}
            className="text-deep-forest text-lg font-semibold border-b border-slate-mist pb-2"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setVisible(false)}
            className="text-deep-forest text-lg font-semibold border-b border-slate-mist pb-2"
          >
            Contact
          </Link>

          <div className="flex flex-col space-y-3 pt-4">
            <Link to="/auth/login">
              <Button
                block
                className="border-deep-forest! text-deep-forest! font-bold"
              >
                Login
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button
                block
                className="bg-dark-sea-green! text-white! border-none! font-bold"
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
