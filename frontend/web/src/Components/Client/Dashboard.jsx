import {
  ArrowDownward,
  ArrowUpward,
  LiveHelp,
  MoreVert,
} from "@mui/icons-material";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PieCharts from "./PieChart";
import BarMixChart from "./BarMixChart";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getStrokeRecommendations } from "../../Utils/Store/PredictionStore";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  useEffect(() => {
    dispatch(getStrokeRecommendations({ data: userId }));
  }, [dispatch, userId]);

  const StrokePrediction = useSelector(
    (state) => state.PredictionStore.outputGetStrokeRecommendations
  );
  const prediction = StrokePrediction?.predictions?.length;
  const present =
    ((StrokePrediction?.predictions?.[StrokePrediction?.predictions?.length - 1]
      .prediction -
      StrokePrediction?.predictions?.[StrokePrediction?.predictions?.length - 2]
        .prediction) /
      StrokePrediction?.predictions?.[StrokePrediction?.predictions?.length - 2]
        .prediction) *
    100;
  return (
    <Stack sx={{ width: "84%" }}>
      <Stack
        sx={{ background: "#192655", height: "10dvh" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography color={"#FFFFFF"} fontSize={"24px"} fontWeight={"bold"}>
          Dashboard
        </Typography>
      </Stack>
      <Stack sx={{ mt: 2, p: 2 }}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          // sx={{ height: "75dvh" }}
          gap={5}
        >
          <Stack direction={"row"} gap={10} alignItems={"center"}>
            <Stack gap={5} >
              <Card
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography fontSize={"12px"}>
                    Total Risk Assessment
                  </Typography>
                  <Typography fontSize={"24px"} fontWeight={"bold"}>
                    {prediction}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3.4,
                    alignItems: "flex-end",
                  }}
                >
                  <MoreVert sx={{ fontSize: "18px" }} />
                  <Box
                    sx={{
                      fontSize: "15px",
                      background: present >= 0 ? "#0FAF5810" : "#ff999910",
                      color: present >= 0 ? "#0FAF58" : "red", // Change color based on the value
                      p: 0.5,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 1,
                    }}
                  >
                    {present >= 0 ? (
                      <ArrowDownward sx={{ fontSize: "15px" }} /> // Display a down arrow for negative values
                    ) : (
                      <ArrowUpward sx={{ fontSize: "15px" }} /> // Display an up arrow for positive values
                    )}
                    {Math.abs(present).toFixed(1)} %
                  </Box>
                </Box>
              </Card>
              {/* <Card
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography fontSize={"12px"}>
                    Total Risk Assessment
                  </Typography>
                  <Typography fontSize={"24px"} fontWeight={"bold"}>
                    2,420
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3.4,
                    alignItems: "flex-end",
                  }}
                >
                  <MoreVert sx={{ fontSize: "18px" }} />
                  <Box
                    sx={{
                      fontSize: "15px",
                      background: "#0FAF5810",
                      color: "#0FAF58",
                      p: 0.5,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 1,
                    }}
                  >
                    <ArrowUpward sx={{ fontSize: "15px" }} /> 20%
                  </Box>
                </Box>
              </Card> */}
            </Stack>
            <Card sx={{ width: 360, p: 2 }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>Latest Report</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/risk-assessment")}
                >
                  Retake
                </Button>
              </Stack>
              <PieCharts />
            </Card>
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                right: "50px",
                border: "1px solid #FFFFFF",
                background: "#16C2D5",
                cursor: "pointer",
                "&:hover": { border: "1px solid #16C2D5" },
                padding: 1,
              }}
              onClick={() => navigate("/faq")}
            >
              <LiveHelp />
              <Typography>FQA's</Typography>
            </Button>
          </Stack>
          <Stack sx={{ width: "60%", height: "50dvh" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography>Report Summary</Typography>
            </Stack>
            <BarMixChart />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
