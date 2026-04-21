import { message } from "antd";

// Globally Create a Random Id
window.getRandomId = () =>
  Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

// generate Email Validation Globally
window.isValidEmail = (email) => /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email);

// Globaly create toastify
window.toastify = (msg, type) => message[type](msg);
