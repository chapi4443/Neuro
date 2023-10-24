import {
  Button,
  Collapse,
  ImageListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import logo from "../../Image/image 14.png";
import {
  Assessment,
  Chat,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Help,
  LiveHelp,
  Logout,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Sidebar = () => {
  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  return (
    <Stack
      sx={{
        width: 245,
        background: "#192655",
        height: "100dvh",
        position: "sticky",
        top: 0,
        pt: 2,
      }}
      gap={5}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={2}
        width={"100%"}
        justifyContent={"center"}
      >
        <ImageListItem sx={{ maxHeight: "10dvh", maxWidth: "30%" }}>
          <img src={logo} alt="logo" style={{ width: "100%" }} />
        </ImageListItem>
        <Button
          variant="contained"
          sx={{
            background: "#16C2D5",
            "&:hover": {
              background: "#16C2D5",
              color: "#FFFFFF",
              boxShadow: "none",
            },
            borderRadius: 6,
            boxShadow: "none",
          }}
          onClick={() => navigate("/dashboard")}
        >
          Neurogen AI
        </Button>
      </Stack>
      <Stack>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            sx={{ "&:hover": { background: "#16C2D5" } }}
            onClick={handleClick2}
          >
            <ListItemText primary="Main Boards" sx={{ color: "#FFFFFF" }} />
            {open2 ? (
              <ExpandLess sx={{ color: "#FFFFFF" }} />
            ) : (
              <ExpandMore sx={{ color: "#FFFFFF" }} />
            )}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4, "&:hover": { background: "#16C2D5" } }}
                onClick={() => navigate("/dashboard")}
              >
                <ListItemIcon>
                  <Dashboard sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ color: "#FFFFFF" }} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4, "&:hover": { background: "#16C2D5" } }}
                onClick={() => navigate("/risk-assessment")}
              >
                <ListItemIcon>
                  <Assessment sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Risk Assessment"
                  sx={{ color: "#FFFFFF" }}
                />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4, "&:hover": { background: "#16C2D5" } }}
                onClick={() => navigate("/chat-bot")}
              >
                <ListItemIcon>
                  <Chat sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="Chat Bot" sx={{ color: "#FFFFFF" }} />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton
            sx={{ "&:hover": { background: "#16C2D5" } }}
            onClick={handleClick}
          >
            <ListItemText primary="Settings" sx={{ color: "#FFFFFF" }} />
            {open ? (
              <ExpandLess sx={{ color: "#FFFFFF" }} />
            ) : (
              <ExpandMore sx={{ color: "#FFFFFF" }} />
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4, "&:hover": { background: "#16C2D5" } }}
                onClick={() => navigate("/help-guide")}
              >
                <ListItemIcon>
                  <LiveHelp sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="FAQ's" sx={{ color: "#FFFFFF" }} />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4, "&:hover": { background: "#16C2D5" } }}
                onClick={() => navigate("/help-guide")}
              >
                <ListItemIcon>
                  <Help sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Help And Guide"
                  sx={{ color: "#FFFFFF" }}
                />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4, "&:hover": { background: "#16C2D5" } }}
                onClick={() => navigate("/setting")}
              >
                <ListItemIcon>
                  <Settings sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ color: "#FFFFFF" }} />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton
            sx={{ pl: 4, "&:hover": { background: "#16C2D5" } }}
            onClick={() => {
              localStorage.clear();
              Cookies.remove("token");
              window.location.href = "/login";
            }}
          >
            <ListItemIcon>
              <Logout sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "#FFFFFF" }} />
          </ListItemButton>
        </List>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
