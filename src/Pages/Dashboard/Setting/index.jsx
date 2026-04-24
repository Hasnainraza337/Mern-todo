import React from "react";
import { Card, Tabs, Form, Input, Button, Switch, Divider } from "antd";
import { LockOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";

const Setting = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-deep-forest mb-8">Settings</h2>

      <Card className="shadow-lg rounded-3xl border-none overflow-hidden">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          className="p-4"
          items={[
            {
              key: "1",
              label: (
                <span className="px-4">
                  <LockOutlined /> Password
                </span>
              ),
              children: (
                <div className="p-4 space-y-6">
                  <h3 className="text-xl font-bold text-deep-forest">
                    Change Password
                  </h3>
                  <Form layout="vertical" className="max-w-md">
                    <Form.Item label="Current Password">
                      <Input.Password className="h-11 rounded-lg" />
                    </Form.Item>
                    <Form.Item label="New Password">
                      <Input.Password className="h-11 rounded-lg" />
                    </Form.Item>
                    <Button className="bg-deep-terracotta! text-white! border-none px-8 font-bold h-11 rounded-lg shadow-md hover:opacity-90">
                      Update Password
                    </Button>
                  </Form>
                </div>
              ),
            },
            {
              key: "2",
              label: (
                <span className="px-4">
                  <BellOutlined /> Notifications
                </span>
              ),
              children: (
                <div className="p-4 space-y-6">
                  <h3 className="text-xl font-bold text-deep-forest">
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Daily Task Summary</span>
                      <Switch defaultChecked />
                    </div>
                    <Divider />
                    <div className="flex justify-between items-center">
                      <span>New User Alerts (Admin Only)</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Setting;
