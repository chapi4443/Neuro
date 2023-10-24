import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import AuthLogin from "./Pages/AuthLogin";
import AuthRegister from "./Pages/AuthRegister";
import DashboardUser from "./Pages/DashboardUser";
import RiskUser from "./Pages/RiskUser";
import ChatUser from "./Pages/ChatUser";
import HelpUser from "./Pages/HelpUser";
import SettingUser from "./Pages/SettingUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/register" element={<AuthRegister />} />
      <Route path="/dashboard" element={<DashboardUser />} />
      <Route path="/risk-assessment" element={<RiskUser />} />
      <Route path="/chat-bot" element={<ChatUser />} />
      <Route path="/help-guide" element={<HelpUser />} />
      <Route path="/setting" element={<SettingUser />} />
    </Routes>
  );
}

export default App;
