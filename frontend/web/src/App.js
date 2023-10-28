import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import AuthLogin from "./Pages/AuthLogin";
import AuthRegister from "./Pages/AuthRegister";
import DashboardUser from "./Pages/DashboardUser";
import RiskUser from "./Pages/RiskUser";
import ChatUser from "./Pages/ChatUser";
import HelpUser from "./Pages/HelpUser";
import SettingUser from "./Pages/SettingUser";
import FAQUser from "./Pages/FAQUser";
import HistoryOfChat from "./Pages/HistoryOfChat";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
function App() {
  const token = Cookies.get("token") || "guest";
  const decodedToken = token === "guest" ? "guest" : jwt_decode(token);
  const role = decodedToken.role || "guest";
  console.log(role);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/register" element={<AuthRegister />} />

      <Route
        path="/dashboard"
        element={
          role === "user" ? <DashboardUser /> : <Navigate to={"/login"} />
        }
      />
      <Route
        path="/risk-assessment"
        element={role === "user" ? <RiskUser /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/chat-bot"
        element={role === "user" ? <ChatUser /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/help-guide"
        element={role === "user" ? <HelpUser /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/faq"
        element={role === "user" ? <FAQUser /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/setting"
        element={role === "user" ? <SettingUser /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/chat-history"
        element={
          role === "user" ? <HistoryOfChat /> : <Navigate to={"/login"} />
        }
      />
      <Route
        path="/*"
        element={
          role === "user" ? (
            <Navigate to={"/dashboard"} />
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
    </Routes>
  );
}

export default App;
