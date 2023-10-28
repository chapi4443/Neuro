import React from "react";
import logo from "../../Image/image 14.png";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Import your custom CSS file for styling


const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
        <button className="navbar-button" onClick={() => navigate("/")}>
          Neurogen AI
        </button>
      </div>
      <div className="button-container">
        <button className="nav-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="nav-button" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Navbar;
