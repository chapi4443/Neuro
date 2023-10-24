import { ArrowUpward, MoreVert } from "@mui/icons-material";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import React from "react";
import PieCharts from "./PieChart";
import BarMixChart from "./BarMixChart";
const Dashboard = () => {
  return (
    <Stack sx={{width:"84%"}}>
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
          <Stack direction={"row"} gap={10}>
            <Stack gap={5}>
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
              </Card>
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
              </Card>
            </Stack>
            <Card sx={{ width: 360, p: 2 }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>Latest Report</Typography>
                <Button variant="outlined" size="small">
                  Retake
                </Button>
              </Stack>
              <PieCharts />
            </Card>
          </Stack>
          <Stack sx={{ width: "60%", height: "50dvh" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography>Report Summary</Typography>
              <Button variant="outlined" size="small">
                Retake
              </Button>
            </Stack>
            <BarMixChart />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
