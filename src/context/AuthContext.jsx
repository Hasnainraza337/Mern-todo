import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const auth = createContext();

const intialState = { isAuth: false, user: {} };

const AuthContext = ({ children }) => {
  const [state, setState] = useState(intialState);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const navigate = useNavigate();

  const readProfile = (token) => {
    const jwt = token || localStorage.getItem("jwt");
    axios
      .get("http://localhost:8000/auth/user-profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setState({ isAuth: true, user: data.user });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsAppLoading(false));
  };

  useEffect(() => {
    readProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setState(intialState);
    navigate("/");
    window.toastify("Logout successful", "success");
  };

  return (
    <auth.Provider
      value={{
        ...state,
        isAppLoading,
        readProfile,
        handleLogout,
        dispatch: setState,
      }}
    >
      {children}
    </auth.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(auth);
