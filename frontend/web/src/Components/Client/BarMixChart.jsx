import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianAxis,
} from "recharts";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getStrokeRecommendations } from "../../Utils/Store/PredictionStore";

const BarMixChart = () => {
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

  const predictions = StrokePrediction?.predictions;
  
  // Take the last 6 data points
  const last6Predictions = predictions
    ? predictions.slice(Math.max(predictions.length - 6, 0))
    : [];

  const data = last6Predictions.map((prediction, index) => ({
    // name: `Page ${String.fromCharCode(65 + index)}`,
    Risk: Math.round(prediction.prediction * 100), // Adjust this if needed
    Not_Risk: 100 - Math.round(prediction.prediction * 100),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={15}
      >
        <CartesianGrid strokeDasharray="3 0" />
        <CartesianAxis strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Risk" stackId="a" fill="#16C2D5" />
        <Bar dataKey="Not_Risk" stackId="a" fill="transparent" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarMixChart;
