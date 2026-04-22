import React from "react";
import { Link } from "react-router-dom";

const Copyrights = () => {
  return (
    <footer className="bg-deep-forest text-abstract-white py-10 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold tracking-wider">
              Task<span className="text-dark-sea-green">Manager</span>
            </div>
            <p className="text-slate-mist text-sm max-w-xs">
              Manage your daily tasks efficiently with our modern MERN Todo
              application. Stay organized, stay productive.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark-sea-green">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-mist">
              <li>
                <Link to="/" className="hover:text-abstract-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-abstract-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-abstract-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark-sea-green">
              Get in Touch
            </h3>
            <p className="text-sm text-slate-mist">Email: support@mylogo.com</p>
            <p className="text-sm text-slate-mist">
              Location: Faisalabad, Pakistan
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-mist/20 pt-6 text-center">
          <p className="text-xs text-slate-mist">
            © {new Date().getFullYear()}{" "}
            <span className="text-abstract-white font-medium">
              Hasnain Raza
            </span>
            . Built with ❤️ using{" "}
            <span className="text-dark-sea-green">MERN Stack</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Copyrights;
