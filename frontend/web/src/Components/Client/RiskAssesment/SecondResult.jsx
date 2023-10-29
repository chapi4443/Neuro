import {  Card, CardContent, Paper,  Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
// Function to format the text
function formatText(text) {
  // Replace **...** with <strong>...</strong>
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace *...* with <li>...</li>
  text = text.replace(/\* (.*?)\n/g, `<li>$1</li>`);

  return text;
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
        <CardContent>{parse(formatText(data.recommendations))}</CardContent>
      </Card>
    </Paper>
  );
};

export default SecondResult;
