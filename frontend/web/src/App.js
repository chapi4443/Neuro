import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Common from "./pages/Common";
import SharedLayout from "./pages/SharedLayout";
import FirstPage from "./pages/firstpage";
import Registeration from "./pages/Registration";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<FirstPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="registeration" element={<Registeration />} />
          <Route path="common" element={<Common />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
