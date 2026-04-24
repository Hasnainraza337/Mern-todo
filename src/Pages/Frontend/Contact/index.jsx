import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import {
  MailOutlined,
  SendOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import axios from "axios";

const initialState = { name: "", email: "", message: "" };

const Contact = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { name, email, message } = state;

    const contactData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };
    if (!contactData.name || !contactData.email || !contactData.message) {
      return window.toastify("Please fill all the fields", "error");
    }

    setIsProcessing(true);
    axios
      .post("http://localhost:8000/contact/create-contact", contactData)
      .then((res) => {
        const { status, data } = res;
        if (status === 201) {
          window.toastify(data.message, "success");
          form.resetFields();
          setState(initialState);
        }
      })
      .catch((error) => {
        window.toastify("Internal Server Error , Try Again", "error");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <>
      <div className="py-16 px-6 bg-abstract-white min-h-screen">
        <div className="container mx-auto max-w-6xl">
          {/* Top Section: Info & Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Contact Info */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-deep-forest mb-4">
                Let's Connect
              </h2>
              <p className="text-slate-mist text-lg mb-8">
                Have questions about the app or want to collaborate? Send a
                message and I'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-deep-forest group">
                  <div className="bg-dark-sea-green/10 p-4 rounded-2xl text-dark-sea-green group-hover:bg-dark-sea-green group-hover:text-white transition-all">
                    <MailOutlined className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-mist uppercase tracking-widest font-bold">
                      Email Us
                    </p>
                    <p className="font-semibold">contact@hasnainraza.dev</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-deep-forest group">
                  <div className="bg-deep-terracotta/10 p-4 rounded-2xl text-deep-terracotta group-hover:bg-deep-terracotta group-hover:text-white transition-all">
                    <EnvironmentOutlined className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-mist uppercase tracking-widest font-bold">
                      Our Location
                    </p>
                    <p className="font-semibold">
                      NiA Lahore , Punjab, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="shadow-2xl rounded-3xl border-none p-4 bg-white/80 backdrop-blur-sm">
              <Form form={form} layout="vertical">
                <Form.Item
                  label={
                    <span className="font-semibold text-deep-forest">
                      Your Name
                    </span>
                  }
                >
                  <Input
                    name="name"
                    placeholder="Enter your name"
                    className="h-11 rounded-lg border-slate-mist/30 focus:border-dark-sea-green"
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="font-semibold text-deep-forest">
                      Email Address
                    </span>
                  }
                >
                  <Input
                    name="email"
                    placeholder="Enter your email"
                    className="h-11 rounded-lg border-slate-mist/30 focus:border-dark-sea-green"
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="font-semibold text-deep-forest">
                      Message
                    </span>
                  }
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="How can I help?"
                    name="message"
                    className="rounded-lg border-slate-mist/30 focus:border-dark-sea-green"
                    onChange={handleChange}
                  />
                </Form.Item>
                <Button
                  block
                  loading={isProcessing}
                  disabled={isProcessing}
                  icon={<SendOutlined />}
                  htmlType="submit"
                  className="bg-deep-forest! text-white! border-none! h-12 font-bold rounded-lg hover:bg-dark-sea-green! transition-all shadow-lg"
                  onClick={handleSubmit}
                >
                  Send Message
                </Button>
              </Form>
            </Card>
          </div>
        </div>
      </div>
      {/* Bottom Section: Map */}
      <div className="w-full overflow-hidden mb-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13632.890396118959!2d72.7213225405241!3d31.325225037143394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392252c121f5997b%3A0x2ed3732bd5358689!2sNaya%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1776758991705!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Location"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
