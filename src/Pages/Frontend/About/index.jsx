import React from "react";
import { Card } from "antd";

const About = () => {
  return (
    <div className="py-16 px-6 bg-abstract-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-deep-forest mb-8 border-b-4 border-dark-sea-green w-fit pb-2">
          About The Project
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-slate-mist text-lg leading-relaxed">
            <p>
              This Todo Application is more than just a list—it's a showcase of
              modern web engineering. Developed by{" "}
              <span className="text-deep-forest font-bold">Hasnain Raza</span>,
              this project integrates high-end UI trends like Glassmorphism and
              Bento Grids.
            </p>
            <p>
              Using **MongoDB, Express, React, and Node.js**, we've created a
              platform that is not only beautiful but also highly functional and
              scalable.
            </p>
          </div>

          <Card className="bg-deep-forest text-white border-none rounded-3xl shadow-2xl">
            <h4 className="text-dark-sea-green font-mono mb-4 text-xl">
              // Tech Stack
            </h4>
            <ul className="space-y-2 font-medium">
              <li className="flex justify-between">
                <span>Frontend:</span>{" "}
                <span className="text-dark-sea-green">React + Tailwind</span>
              </li>
              <li className="flex justify-between">
                <span>UI Library:</span>{" "}
                <span className="text-dark-sea-green">Ant Design</span>
              </li>
              <li className="flex justify-between">
                <span>Backend:</span>{" "}
                <span className="text-dark-sea-green">Node.js + Express</span>
              </li>
              <li className="flex justify-between">
                <span>Database:</span>{" "}
                <span className="text-dark-sea-green">MongoDB</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
