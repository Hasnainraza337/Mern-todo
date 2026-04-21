import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import NoPage from "@/components/Misc/NoPage";
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </main>
    </>
  );
};

export default Auth;
