import {
  Box,
  Button,
  Collapse,
  IconButton,
  ImageListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../../Image/image 14.png";
import {
  Assessment,
  Chat,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Phone,
  Menu,
  Close,
} from "@mui/icons-material";
import { useMatch, useNavigate } from "react-router-dom";

const ChatLayout = () => {
  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const navigate = useNavigate();
  const isDashboardActive = useMatch("/dashboard");
  const isRiskAssessmentActive = useMatch("/risk-assessment");
  const isChatBotActive = useMatch("/chat-bot");
  const isHelpGuideActive = useMatch("/chat-history");
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const activeListItemButtonStyle = {
    backgroundColor: "#16C2D5",
  };
  const isMobile = useMediaQuery("(max-width: 770px)");
  const [openSidebar, setOpenSidebar] = useState(isMobile);
  return (
    <>
      {openSidebar ? (
        <>
          <Box
            sx={{
              padding: "18px 15px",
              background: "#192655",
              height: "62px",
            }}
          >
            <Menu onClick={() => setOpenSidebar(!isMobile)} />
          </Box>
        </>
      ) : (
        <Stack
          sx={{
            width: 245,
            background: "#192655",
            height: "100dvh",
            position: isMobile ? "fixed" : "sticky",
            top: 0,
            pt: 2,
            zIndex: 1, // Set the initial z-index
            "@media (max-width: 770px)": {
              zIndex: 2, // Set a higher z-index for screens 770px or below
            },
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
            {!isMobile ? (
              <>
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
              </>
            ) : (
              <IconButton sx={{ color: "#FFFFFF" }}>
                <Close onClick={() => setOpenSidebar(isMobile)} />
              </IconButton>
            )}
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
                    <ListItemText
                      primary="Dashboard"
                      sx={{ color: "#FFFFFF" }}
                    />
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
                    onClick={() => {
                      navigate("/chat-bot");
                      handleClick();
                    }}
                  >
                    <ListItemIcon>
                      <Chat sx={{ color: "#FFFFFF" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Chat Bot"
                      sx={{ color: "#FFFFFF" }}
                    />
                    {open ? (
                      <ExpandLess sx={{ color: "#FFFFFF" }} />
                    ) : (
                      <ExpandMore sx={{ color: "#FFFFFF" }} />
                    )}
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{
                      pl: 4,
                      "&:hover": { background: "#16C2D5" },
                      ...(isHelpGuideActive && activeListItemButtonStyle),
                    }}
                    onClick={() => navigate("/chat-history")}
                  >
                    <ListItemText
                      primary="Chat History"
                      sx={{ color: "#FFFFFF" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Stack>

          <IconButton
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
          </IconButton>
        </Stack>
      )}
    </>
  );
};

export default ChatLayout;
