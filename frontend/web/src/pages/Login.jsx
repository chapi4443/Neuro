import { useRef, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextCompo from "../components/TextCompo";
import NeuronCompo from "../components/NeuronCompo NeuronCompo";
import cookies from "js-cookie";
import { useMediaQuery } from "@mui/material";
const LOGIN_URL = "/api/v1/auth/login";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  // const location = useLocation();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("response", response.data.user.token);
      cookies.set("token", response.data.user.token, { expires: 2 });

      // const accessToken = JSON.stringify(response?.data?.token);

      // const userId = JSON.stringify(response?.data?.user);

      // const role = JSON.stringify(response?.data?.role);

      navigate("/user");
      setUser("");
      setPwd("");
      // navigate('/user', { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  const isNotMobile = useMediaQuery("(min-width: 428px)");
  return (
    <>
      <NeuronCompo display={"flex"} />
      <TextCompo
        title={"Log in"}
        subtitle={"Log in as a user"}
        marginTop={"-10px"}
      />
      <section
        style={{
          margin: isNotMobile ? "40px 550px" : "30px",
        }}
      >
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button
            style={{
              background: "#16C2D5",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>
        <p>
          Need an Account?
          <span
            style={{
              cursor: "pointer",
              color: "#000",
            }}
          >
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </section>
    </>
  );
};

export default Login;
