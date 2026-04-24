import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const PrivateRouting = ({ Component }) => {
  return <Component />;
};

export default PrivateRouting;
