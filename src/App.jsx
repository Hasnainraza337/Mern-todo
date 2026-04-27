import "./App.css";
import AppRoutes from "./pages/Routes";
import ScreenLoader from "./components/Misc/ScreenLoader";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { isAppLoading } = useAuthContext();
  return (
    <>
      {isAppLoading ? (
        <ScreenLoader tip="Task Management System" />
      ) : (
        <AppRoutes />
      )}
    </>
  );
}
export default App;
