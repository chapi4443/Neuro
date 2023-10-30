import { Card, CardContent, Paper, Stack, Typography,Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
function formatText(text) {
  // Replace **...** with <strong>...</strong>
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace *...* with <li>...</li>
  text = text.replace(/\* (.*?)\n/g, `<li>$1</li>`);

  return text;
}
const Result = () => {
  const StrokePrediction = useSelector(
    (state) => state.PredictionStore.outputStrokepredictor
  );

  // Check if StrokePrediction has the expected structure
  if (!StrokePrediction || !StrokePrediction.data) {
    return (
      <Stack>
        <Paper elevation={0} sx={{ marginBottom: 2 }}>
        <Card sx={{ p: 1 }}>
        <Skeleton  animation="wave" width={210}  />
        <CardContent>
        <Skeleton animation="wave" />
        </CardContent>
        </Card>
      </Paper>
      <Paper elevation={0} sx={{ marginBottom: 2 }}>
        <Card sx={{ p: 1 }}>
        <Skeleton  animation="wave" width={210}  />
        <CardContent>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton  animation="wave" width={500}  />
        </CardContent>
        </Card>
      </Paper>
      </Stack>
    );
  }

  const { data } = StrokePrediction;

  return (
    <Stack>
      <Paper elevation={0} sx={{ marginBottom: 2 }}>
        <Card sx={{ p: 1 }}>
          <Typography variant="h6" fontWeight={"bold"}>
            Prediction
          </Typography>
          <CardContent>
            <Typography variant="body1">
              {(data["Logistic Regression Probability"] * 100).toFixed(2)}%
            </Typography>
          </CardContent>
        </Card>
      </Paper>
      <Paper elevation={0} sx={{ marginBottom: 2 }}>
        <Card sx={{ p: 1 }}>
          <Typography variant="h6" fontWeight={"bold"}>
            Advice
          </Typography>
          <CardContent>
            <Typography variant="body1">
              {parse(formatText(data.Advice))}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Stack>
  );
};

export default Result;
