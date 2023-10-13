import { useRef, useState, useEffect } from "react";

import NeuronCompo from "../components/NeuronCompo NeuronCompo";
import TextCompo from "../components/TextCompo";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";

import { Images } from "../assets/images/signinbuttons";

import axios from "../app/api/axios";
import { Box, styled, Typography, useMediaQuery } from "@mui/material";

const USER_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const StyledTypoTwo = styled(Typography)((theme) => {
  const isXs = useMediaQuery("(min-width: 385px)");
  const isXs_2 = useMediaQuery("(min-width: 800px)");

  // const isXs_2 = useMediaQuery("(min-width: 800px)");

  return {
    marginTop: "20px",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
  };
});
const Styledbuton = styled("button")((theme) => {
  const isXs = useMediaQuery("(min-width: 385px)");
  const isXs_2 = useMediaQuery("(min-width: 800px)");

  // const isXs_2 = useMediaQuery("(min-width: 800px)");

  return {
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

const Register = () => {
  const isNotMobile = useMediaQuery("(min-width: 428px)");

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  const data = [
    { id: 1, name: Images.Apple },
    { id: 2, name: Images.Facebook },
    { id: 3, name: Images.Google },
  ];
  return (
    <div>
      <NeuronCompo display={"none"} />
      <TextCompo
        title={"Register"}
        subtitle={"Create an account so you can explore all the existing jobs"}
        marginTop={"-150px"}
      />
      <div
        style={{
          width: isNotMobile ? "357px" : "257px",
          marginLeft: isNotMobile ? "500px" : "40px",
          margin: isNotMobile ? "20px 500px" : "150px 20px",
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
          <label htmlFor="email">
            <span className={validName ? "valid" : "hide"}>
              Email: <CheckIcon color="primary" />
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
              Email: <CloseIcon color="error" />
            </span>
          </label>
          <input
            placeholder="Email"
            type="email" // Change the input type to "email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
            }
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <InfoIcon />
            Please enter a valid email address like user@exa.com.
          </p>

          {/* password starts */}
          <label htmlFor="password">
            <span className={validPwd ? "valid" : "hide"}>
              Password:
              <CheckIcon color="primary" />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
              Password:
              <CloseIcon color="error" />
            </span>
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <InfoIcon />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
          {/* password ends */}
          {/* confirm password starts */}
          <label htmlFor="confirm_pwd">
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
              Confirm password:
              <CheckIcon color="primary" />
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
              Confirm password:
              <CloseIcon color="error" />
            </span>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <InfoIcon />
            Must match the first password input field.
          </p>
          {/* confirm password ends */}
          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
            style={{
              borderRadius: "10px",
              background: "#16C2D5",
              boxShadow: "0px 10px 20px 0px #CBD6FF",
              border: "none",
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Poppins",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>
        <div>
          <StyledTypoTwo>Already have an account</StyledTypoTwo>
          <StyledTypoTwo sx={{ color: "#16C2D5" }}>
            Or continue with
          </StyledTypoTwo>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap:"5px"
          }}
        >
          {data.map((item) => (
            <Styledbuton key={item.id}>
              <img src={item.name} />
            </Styledbuton>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default Register;
