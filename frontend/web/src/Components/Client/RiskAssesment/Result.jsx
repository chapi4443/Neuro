import { Box, Card, CardContent, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
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
const Result = () => {
  const StrokePrediction = useSelector(
    (state) => state.PredictionStore.outputStrokepredictor
  );

  // Check if StrokePrediction has the expected structure
  if (!StrokePrediction || !StrokePrediction.data) {
    return (
      <Stack>
        <Typography>Loading ...</Typography>
      </Stack>
    );
  }

  const { data } = StrokePrediction;

  return (
    <Stack>
      <Paper elevation={3} sx={{ marginBottom: 2 }}>
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
      <Paper elevation={3} sx={{ marginBottom: 2 }}>
        <Card sx={{ p: 1 }}>
          <Typography variant="h6" fontWeight={"bold"}>
            Advice
          </Typography>
          <CardContent>
            <Typography variant="body1">{formatText(data.Advice)}</Typography>
          </CardContent>
        </Card>
      </Paper>
    </Stack>
  );
};

export default Result;
