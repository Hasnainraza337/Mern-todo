import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const auth = createContext();

const intialState = { isAuth: false, user: {} };

const AuthContext = ({ children }) => {
  const [state, setState] = useState(intialState);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const navigate = useNavigate();

  const readProfile = async (token) => {
    const jwt = token || localStorage.getItem("jwt");
    if (!jwt) {
      setState(intialState);
      setIsAppLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:8000/auth/user-profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (res.status === 200) {
        setState({ isAuth: true, user: res.data.user });
        return res.data.user;
      }
    } catch (err) {
      setState(intialState);
      throw err;
    } finally {
      setIsAppLoading(false);
    }
  };

  // const readProfile = (token) => {
  //   const jwt = token || localStorage.getItem("jwt");
  //   if (!jwt) {
  //     setState(intialState);
  //     setIsAppLoading(false);
  //     return;
  //   }
  //   axios
  //     .get("http://localhost:8000/auth/user-profile", {
  //       headers: { Authorization: `Bearer ${jwt}` },
  //     })
  //     .then((res) => {
  //       const { status, data } = res;
  //       if (status === 200) {
  //         setState({ isAuth: true, user: data.user });
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       localStorage.removeItem("jwt");
  //       setState(intialState);
  //     })
  //     .finally(() => setIsAppLoading(false));
  // };

  useEffect(() => {
    readProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setState(intialState);
    window.toastify("Logout successful", "success");
    navigate("/auth/login", { replace: true });
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
