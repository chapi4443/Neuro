import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Common from "./pages/Common";
import SharedLayout from "./pages/SharedLayout";
import FirstPage from "./pages/firstpage";
import { Routes, Route, Navigate } from "react-router-dom";
import Unauthorized from "./components/Unauthorized";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function App() {
  const token = cookies.get("token") || "guest";
  const detoken = token === "guest" ? "guest" : jwt_decode(token);
  const roles = detoken.role;

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<FirstPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="common" element={<Common  />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        <Route
          path="/user"
          element={roles === "user" ? <Common /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
