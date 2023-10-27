import { Box, Card, CardContent, Paper,  Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

// Function to format the text
function formatText(text) {
  return text.split("\n").map((paragraph, index) => (
    <Box key={index} variant="body1" sx={{ whiteSpace: "pre-line" }}>
      {paragraph.split(/\*([^*]+)\*/g).map((chunk, index) =>
        index % 2 === 1 ? (
          <Typography
            key={index}
            component="span"
            variant="body1"
            fontWeight="bold"
          >
            {chunk.replace(/\*([^*]+)\*/g, "")}
          </Typography>
        ) : (
          //   chunk
          <Typography key={index} component="span" sx={{ pl: 1 }}>
            {chunk}
          </Typography>
        )
      )}
    </Box>
  ));
}

const SecondResult = () => {
  const StrokeRecommendations = useSelector(
    (state) => state.PredictionStore.outputStrokeRecommendations
  );
  const { data } = StrokeRecommendations;

  return (
    <Paper elevation={3} sx={{ marginBottom: 2 }}>
      <Card sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight={"bold"}>
          Recommendations
        </Typography>
        <CardContent>{formatText(data.recommendations)}</CardContent>
      </Card>
    </Paper>
  );
};

export default SecondResult;
