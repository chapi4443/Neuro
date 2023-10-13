import {styled, Typography, useMediaQuery } from '@mui/material';
import React from 'react'

const StyledTypo = styled(Typography)(({ theme }) => {
    const isXs = useMediaQuery("(min-width: 385px)");
    const isXs_2 = useMediaQuery("(min-width: 800px)");
  
    return {
      color: "#16C2D5",
      textAlign: "center",
      fontFamily: "Poppins",
      fontSize: isXs ? "40px" : "24px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
      "&:hover": {
        cursor: "pointer",
        color: "#16C2D5",
        background: "#fff",
        border: "1px solid #16C2D5",
      },
      "&:active": {
        color: "#fff",
        background: "#16C2D5",
        border: "none",
      },
    };
  });
  
  const StyledTypoTwo = styled(Typography)((theme) => {
    const isXs = useMediaQuery("(min-width: 385px)");
    const isXs_2 = useMediaQuery("(min-width: 800px)");
  
    // const isXs_2 = useMediaQuery("(min-width: 800px)");
  
    return {
      color: "#000",
      textAlign: "center",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
    };
  });
  
  const styles = {
    container: {
      position: "relative",
      width: "200px",
      height: "200px",
    },
    image: {
      width: "80%",
      height: "90%",
      objectFit: "cover",
      overflowX: "hidden",
    },
    circle: {
      position: "absolute",
      width: "250px",
      height: "250px",
      borderRadius: "50%",
      border: "3px solid #D3DDFF",
      top: "12%",
      left: "25%",
      transform: "translate(-50%, -50%)", // Center the circle
      overflowX: "hidden",
      overflow: "hidden",
    },
    text: {
      position: "absolute",
      overflowX: "hidden",
  
      // height: "250px",
      // borderRadius: "50%",
      // border: "3px solid #D3DDFF",
      top: "35%",
      left: "45%",
      transform: "translate(-50%, -50%)", // Center the circle
    },
  };

const TextCompo = ({title, subtitle, marginTop}) => {
    const isNotMobile = useMediaQuery("(min-width: 428px)");
    const textWidth = isNotMobile ? "343px" : "300px";
 
  return (
    <div>
        <div
            style={{
              ...styles.text,
              background: "rgba(255, 255, 255, 0.90)",
              padding: isNotMobile ? "12px 22px" : "5px 5px",
              marginLeft: isNotMobile ? "" : "15px",
              marginTop: isNotMobile ? "20px" : marginTop,
              width: textWidth,
            }}
          >
            <StyledTypo>{title}</StyledTypo>
            <StyledTypoTwo>
              {subtitle}
            </StyledTypoTwo>
          </div>
    </div>
  )
}

export default TextCompo