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
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
  ChatBubbleOutline,
} from "@mui/icons-material";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { getChatHistory } from "../../../Utils/Store/PredictionStore";
import { useDispatch, useSelector } from "react-redux";
const ChatLayout = () => {
  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const navigate = useNavigate();
  const isDashboardActive = useMatch("/dashboard");
  const isChatBotActive = useMatch("/chat-bot");
  const { id } = useParams();
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const activeListItemButtonStyle = {
    backgroundColor: "#16C2D5",
  };
  const activeListItemButton = {
    backgroundColor: "#272727",
  };
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  useEffect(() => {
    dispatch(getChatHistory({ data: userId }));
  }, [dispatch, userId]);

  const chatHistory = useSelector(
    (state) => state.PredictionStore.OutputChatHistory
  );
  const HistoryOfChat = chatHistory?.chatMessages?.map(
    (item) => item.conversationArrays
  );
  const HistoryOfChat0 = HistoryOfChat?.[0];

  const firstArrayHistory = HistoryOfChat0?.map((conversation, index) => {
    if (conversation.length > 0) {
      const firstMessage = conversation[0];
      return firstMessage;
    }
    return null;
  });

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
                      primary="New Chat"
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
                  <Typography sx={{color:"#FFFFFF",p:1}}>Chat History</Typography>
                  {firstArrayHistory?.map((item, index) => (
                    <ListItemButton
                      key={index} // Add a key prop
                      sx={{
                        pl: 4,
                        "&:hover": { background: "#272727" ,color:"#16C2D5"},
                        ...(id === item._id && activeListItemButton),
                      }}
                      onClick={() => navigate(`/chat-history/${item._id}`)}
                    >
                      <ListItemIcon>
                      <ChatBubbleOutline sx={{ color: "#16C2D5" }} />
                    </ListItemIcon>
                      <ListItemText
                        primary={`${item.text.slice(0, 15)}...`}
                        sx={{ color: "#FFFFFF" }}
                      />
                    </ListItemButton>
                  ))}
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
