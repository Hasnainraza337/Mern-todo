import "./App.css";
import Routes from "../src/pages/Routes";
import ScreenLoader from "./components/Misc/ScreenLoader";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { isAppLoading } = useAuthContext();
  return (
    <>
      {isAppLoading ? (
        <ScreenLoader tip="Task Management System" />
      ) : (
        <Routes />
      )}
    </>
  );
}
export default App;
