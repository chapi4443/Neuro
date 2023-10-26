import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const StyledTypo = styled(Typography)(() => ({
  color: "#1E95F0",
  fontFamily: "Poppins",
  fontSize: " 16px",
  fontWeight: "600",
}));
const StyledButton = styled("button")(() => ({
  borderRadius: "7px",
  border: "1px solid #E06969",
  boxShadow: "0px 4px 4px 0px rgba(75, 75, 75, 0.25)",
  background: "transparent",
  cursor: "pointer",
  color:"#E06969",
  position: "absolute",
  right:"10px",
  top:"-27px",
  transition: "background-color 0.2s ease-in-out", // Add a transition for a smoother effect
  "&:hover": {
    border:"none",
    backgroundColor: "#E06969", // Define the background color for the hover effect
    color: "#ffffff", // Change the text color on hover
  },
}));

const OutputCard = ({
  body,
  title,
  prediction,
  fitness,
  diet,
  fitness_title,
  diet_title,
}) => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: "100%",
        padding: "5px 10px",
        borderRadius: "5px",
        background: "#FFF",
        marginBottom: "2px",
      }}
    >
      {title && <StyledTypo>{title}</StyledTypo>}
      {prediction && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position:"relative",
          }}
        >
          <StyledTypo
            sx={{
              margin: "8px 8px",
              color: "#FF5353",
              fontFamily: "Poppins",
              fontSize: "24px",
              fontStyle: "bold",
              fontWeight: "800",
              lineHeight: "18.387px",
            }}
          >
            {prediction}
          </StyledTypo>
          <StyledButton onClick={() => navigate('/user/dashboard')}>View in Graph</StyledButton>
        </Box>
      )}
      {body && (
        <StyledTypo
          sx={{
            margin: "2px 8px",
            color: "#535353",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "18.387px",
            overflow: "hidden",
            //   whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {body}
        </StyledTypo>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom:"10px"
        }}
      >
        {diet && diet_title && (
          <Box sx={{
          }}>
            <StyledTypo>{diet_title}</StyledTypo>
            <StyledTypo
              flex={1}
              sx={{
                margin: "8px 8px",
                color: "#535353",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "18.387px",
                overflow: "hidden",
                //   whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {diet}
            </StyledTypo>
          </Box>
        )}
        {/* {fitness && fitness_title && (
          <Box>
            <StyledTypo>{fitness_title}</StyledTypo>
            <StyledTypo
              flex={1}
              sx={{
                margin: "8px 8px",
                color: "#535353",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "18.387px",
                overflow: "hidden",
                //   whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {fitness}
            </StyledTypo>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default OutputCard;
