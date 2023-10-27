import {
  Button,
  Collapse,
  IconButton,
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
  Phone,
  Settings,
} from "@mui/icons-material";
import { useMatch, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const navigate = useNavigate();
  const isDashboardActive = useMatch("/dashboard");
  const isRiskAssessmentActive = useMatch("/risk-assessment");
  const isChatBotActive = useMatch("/chat-bot");
  const isHelpGuideActive = useMatch("/help-guide");
  const isSettingsActive = useMatch("/setting");
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const activeListItemButtonStyle = {
    backgroundColor: "#16C2D5",
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
                sx={{
                  pl: 4,
                  "&:hover": { background: "#16C2D5" },
                  ...(isDashboardActive && activeListItemButtonStyle),
                }}
                onClick={() => navigate("/dashboard")}
              >
                <ListItemIcon>
                  <Dashboard sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ color: "#FFFFFF" }} />
              </ListItemButton>
              <ListItemButton
                sx={{
                  pl: 4,
                  "&:hover": { background: "#16C2D5" },
                  ...(isRiskAssessmentActive && activeListItemButtonStyle),
                }}
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
                sx={{
                  pl: 4,
                  "&:hover": { background: "#16C2D5" },
                  ...(isChatBotActive && activeListItemButtonStyle),
                }}
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
                sx={{
                  pl: 4,
                  "&:hover": { background: "#16C2D5" },
                  ...(isHelpGuideActive && activeListItemButtonStyle),
                }}
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
                sx={{
                  pl: 4,
                  "&:hover": { background: "#16C2D5" },
                  ...(isSettingsActive && activeListItemButtonStyle),
                }}
                onClick={() => navigate("/setting")}
              >
                <ListItemIcon>
                  <Settings sx={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ color: "#FFFFFF" }} />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Stack>

      {/* <IconButton
        sx={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 5,
          background: "#16C2D5",
          color: "white",
          "&:hover": { color: "#192655" },
        }}
        onClick={() => {
          window.location.href = "tel:911";
        }}
      >
        <Phone />
      </IconButton> */}
    </Stack>
  );
};

export default Sidebar;
