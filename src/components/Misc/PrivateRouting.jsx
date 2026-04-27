import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const PrivateRouting = ({ Component, allowedRoles }) => {
  const { user, isAuth, isAppLoading } = useAuthContext();

  if (isAppLoading) return null;

  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }

  const hasAccess = allowedRoles
    ? user?.roles?.some((role) => allowedRoles.includes(role))
    : true;

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default PrivateRouting;
