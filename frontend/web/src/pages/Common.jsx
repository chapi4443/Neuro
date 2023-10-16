import { styled, Box, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import TabCard from "../components/smallcompos/TabCard";
import {
  SEttings,
  REport,
  Notifications,
  RA,
  HElp,
  DAshboard,
  CHAT,
} from "./common/index";
import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  InsertEmoticon,
  Menu,
  MoreVert,
  Image,
} from "@mui/icons-material";
import whiteLogo from "../assets/images/white-logo.png";
import Bell from "../assets/images/bell.png";
import Chat from "../assets/images/chat.png";
import Dashboard from "../assets/images/dashboard.png";
import Risk from "../assets/images/risk.png";
import Report from "../assets/images/report.png";
import Help from "../assets/images/help.png";
import Settings from "../assets/images/settings.png";

import SearchCard from "../components/smallcompos/SearchCard";
import ChatCard from "../components/smallcompos/ChatCard";


const MainContentWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  // backgroundColor: '#008cff',
  overflowY: 'scroll',
  // Hide the scrollbar
  '::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none', // IE and Edge
  scrollbarWidth: 'none', // Firefox
});

const MainContent = styled(Box)({
  display:'flex',
  width: '100%',
  backgroundColor: '#ffffff',
  padding: '20px',
  margin: '0 auto', // Align the main content in the center
  // Add any other styles you need for the main content
});

const StyledTypo = styled(Typography)((theme) => {
  // const isXs = useMediaQuery("(min-width: 385px)");
  // const isXs_2 = useMediaQuery("(min-width: 800px)");

  // const isXs_2 = useMediaQuery("(min-width: 800px)");

  return {
    color: "#FFF",

    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "19.6px",
    letterSpacing: "0.14px",
  };
});
const Common = () => {
  const isNotMobile = useMediaQuery("(min-width: 428px)");
  const [notHide, setNotHide] = useState(isNotMobile);
  const [selectedTab, setSelectedTab] = useState(0);
  const [iconUp, setIconUp] = useState(true);
  const [tabCardsVisible, setTabCardsVisible] = useState(true);

  const [iconUpTwo, setIconUpTwo] = useState(true);
  const [tabCardsVisibleTwo, setTabCardsVisibleTwo] = useState(true);

  const [iconUpThree, setIconUpThree] = useState(true);
  const [tabCardsVisibleThree, setTabCardsVisibleThree] = useState(true);

  const toggleVisibility = () => {
    setNotHide(!notHide);
  };

  const toggleTabCardsVisibility = () => {
    setTabCardsVisible(!tabCardsVisible);
    setIconUp(!iconUp);
  };
  const toggleTabCardsVisibilityTwo = () => {
    setTabCardsVisibleTwo(!tabCardsVisibleTwo);
    setIconUpTwo(!iconUpTwo);
  };
  const toggleTabCardsVisibilityThree = () => {
    setTabCardsVisibleThree(!tabCardsVisibleThree);
    setIconUpThree(!iconUpThree);
  };

  const handleTabClick = (index) => {
    setSelectedTab(index);
    setNotHide(isNotMobile ? notHide : !notHide);
  };

  const isTabSelected = (index) => {
    return selectedTab === index;
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {!notHide && (
        <Box
          onClick={toggleVisibility}
          sx={{
            cursor: "pointer",
            color: "rgba(4,118,217)"
          }}
        >
          <Menu />
        </Box>
      )}
      <Box sx={{ display: "flex", position: "relative" }}>
        <Box
          sx={{
            display: isNotMobile ? "flex" : "block",
            transition: "transform 0.3s ease",
            transform: `translateX(${notHide ? "0" : "-260px"})`,
            zIndex: 1, // Ensure the first child is above the second child
          }}
        >
          {notHide && (
            <Box
              sx={{
                borderRight: "2px solid #FFF",
                background: "#16C2D5",
                width: "260px",
                height: "700px",
              }}
            >
              <Box
                sx={{
                  margin: "-5px 20px",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      position: "relative",
                      margin: isNotMobile ? "20px" : "",
                      paddingTop: isNotMobile ? "" : "15px",
                    }}
                  >
                    <img
                      src={whiteLogo}
                      alt="description_of_your_image"
                      style={ {width: '80px', 
                      height: 'auto', }}
                    />
                
                    <Box>
                      <StyledTypo>NeuroGenAI</StyledTypo>
                      <StyledTypo
                        sx={{
                          color: "#625A5A",
                          fontSize: "10px",
                          fontWeight: "400",
                        }}
                      >
                        Fighting Stroke
                      </StyledTypo>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "5px", // Adjust this value to your desired distance from the top
                      right: "8px",
                      cursor: "pointer",
                      color: "rgba(255, 255, 255)"
                    }}
                    onClick={toggleVisibility}
                  >
                    <Close />
                  </Box>
                </Box>
                <TabCard
                  icon={Bell}
                  text={"Notifications"}
                  num={8}
                  onClick={() => handleTabClick(3)}
                  selected={isTabSelected(3)}
                />
              </Box>
              <hr style={{ marginTop: "12px", color: "#fff" }} />
              {/* main boards start */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "90px",
                    margin: "10px 30px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease", // Add transition
                  }}
                  onClick={toggleTabCardsVisibility}
                >
                  <StyledTypo
                    sx={{
                      color: "#625A5A",
                      fontSize: "13px",
                      fontWeight: "400",
                    }}
                  >
                    Main Boards
                  </StyledTypo>
                  {iconUp ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </Box>
                <Box
                  sx={{
                    margin: "0px 16px",
                    paddingTop: tabCardsVisible ? "" : "5px",
                    display: tabCardsVisible ? "block" : "none",
                  }}
                >
                  <TabCard
                    icon={Dashboard}
                    text="Dashboard"
                    onClick={() => handleTabClick(0)}
                    selected={isTabSelected(0)}
                  />
                  <TabCard
                    icon={Risk}
                    text="Risk Assesment"
                    onClick={() => handleTabClick(1)}
                    selected={isTabSelected(1)}
                  />
                  <TabCard
                    icon={Chat}
                    text="New Chat"
                    onClick={() => handleTabClick(2)}
                    selected={isTabSelected(2)}
                  />
                </Box>
              </Box>
              {/* main boards end */}
              {/* Chat history starts */}
              <Box
                sx={{
                  marginTop: "5px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "90px",
                    margin: "10px 30px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease", // Add transition
                  }}
                  onClick={toggleTabCardsVisibilityTwo}
                >
                  <StyledTypo
                    sx={{
                      color: "#625A5A",
                      fontSize: "13px",
                      fontWeight: "400",
                    }}
                  >
                    Chat history
                  </StyledTypo>
                  {iconUpTwo ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </Box>
                <Box
                  sx={{
                    margin: "0px 16px",
                    paddingTop: tabCardsVisibleTwo ? "" : "5px",
                    display: tabCardsVisibleTwo ? "block" : "none",
                  }}
                >
                  <SearchCard />
                  <Box
                    sx={{
                      maxHeight: "80px", // Set a fixed height for scrollable area
                      overflowY: "scroll",
                      "&::-webkit-scrollbar": {
                        width: "4px", // Adjust the scrollbar width as needed
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#888", // Color of the scrollbar thumb
                        borderRadius: "5px", // Add border radius
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "transparent", // Add a gap by making the scrollbar track transparent
                      },
                    }}
                  >
                    <ChatCard
                      icon={Dashboard}
                      textOne={"lorem2"}
                      textTwo={"Lorem jhdgsb cnbhja"}
                    />
                    <ChatCard
                      icon={Dashboard}
                      textOne={"lorem2"}
                      textTwo={"Lorem jhdgsb cnbhja"}
                    />
                    <ChatCard
                      icon={Dashboard}
                      textOne={"lorem2"}
                      textTwo={"Lorem jhdgsb cnbhja"}
                    />
                    <ChatCard
                      icon={Dashboard}
                      textOne={"lorem2"}
                      textTwo={"Lorem jhdgsb cnbhja"}
                    />
                    <ChatCard
                      icon={Dashboard}
                      textOne={"lorem2"}
                      textTwo={"Lorem jhdgsb cnbhja"}
                    />
                    <ChatCard
                      icon={Dashboard}
                      textOne={"lorem2"}
                      textTwo={"Lorem jhdgsb cnbhja"}
                    />
                  </Box>
                </Box>
              </Box>
              {/* Chat history end */}

              {/* settings start */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "90px",
                    margin: "8px 30px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease", // Add transition
                  }}
                  onClick={toggleTabCardsVisibilityThree}
                >
                  <StyledTypo
                    sx={{
                      color: "#625A5A",
                      fontSize: "13px",
                      fontWeight: "400",
                    }}
                  >
                    Settings
                  </StyledTypo>
                  {iconUpThree ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </Box>
                <Box
                  sx={{
                    margin: "0px 16px",
                    paddingTop: tabCardsVisibleThree ? "" : "5px",
                    display: tabCardsVisibleThree ? "block" : "none",
                  }}
                >
                  <TabCard
                    icon={Report}
                    text="Report a problem"
                    onClick={() => handleTabClick(4)}
                    selected={isTabSelected(4)}
                  />
                  <TabCard
                    icon={Help}
                    text="Help guide"
                    onClick={() => handleTabClick(5)}
                    selected={isTabSelected(5)}
                  />
                  <TabCard
                    icon={Settings}
                    text="Settings"
                    onClick={() => handleTabClick(6)}
                    selected={isTabSelected(6)}
                  />
                </Box>
              </Box>
              {/* settings end */}
              {/* upgrade starts */}
              <Box
                sx={{
                  marginTop: "10px",
                  borderRadius: "8px",
                  border: "1px solid #DFDFDF",
                  background: "#FBFBFB",
                  width: "195px",
                  height: "64px",
                  marginLeft: "15px",
                  padding: "10px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <StyledTypo
                  sx={{
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Upgrade account
                </StyledTypo>
                <StyledTypo
                  sx={{
                    color: "#656565",
                    fontSize: "10px",
                    fontWeight: "400",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicszdxgb ing
                  elit.
                </StyledTypo>
                <hr />
              </Box>
              {/* upgrade end*/}
              {/* profile starts */}
              <Box
                sx={{
                  position: "fixed",
                  bottom: "-5px",
                  left: 0,
                  width: "228px",
                  background: "#F6F6F6",
                  padding: "5px 16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "12px",
                      border: "none",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      src="https://images.app.goo.gl/8QTaPKcF3Z4eEHir9"
                      alt="pro"
                    />
                  </Box>
                  <Box sx={{}}>
                    <StyledTypo
                      sx={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      Profile Name
                    </StyledTypo>
                    <StyledTypo
                      sx={{
                        color: "#000",
                        fontSize: "12px",
                        fontWeight: "400",
                      }}
                    >
                      Admin
                    </StyledTypo>
                  </Box>
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                  <MoreVert />
                </Box>
              </Box>

              {/* profile end */}
            </Box>
          )}
        </Box>
        {/*main content start */}
        <MainContentWrapper>
        <MainContent>
          {selectedTab === 0 ? (
            <DAshboard />
          ) : selectedTab === 1 ? (
            <RA />
          ) : selectedTab === 2 ? (
            <CHAT />
          ) : selectedTab === 3 ? (
            <Notifications />
          ) : selectedTab === 4 ? (
            <REport />
          ) : selectedTab === 5 ? (
            <HElp />
          ) : (
            <SEttings />
          )}
        </MainContent>
      </MainContentWrapper>

        {/*main content end */}
      </Box>
    </div>
  );
};

export default Common;
