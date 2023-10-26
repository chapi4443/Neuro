import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Label } from "recharts";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getStrokeRecommendations } from "../../Utils/Store/PredictionStore";

const PieCharts = () => {
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

  const prediction = (
    StrokePrediction?.predictions?.[StrokePrediction?.predictions?.length - 1]
      ?.prediction * 100
  ).toFixed(1);
  console.log(prediction);
  const data = [
    { name: "Group A", value: parseFloat(prediction) },
    { name: "Group B", value: parseFloat(100 - prediction) },
  ];
  const COLORS = [
    prediction >= 90
      ? "red"
      : prediction >= 50
      ? "yellow"
      : prediction >= 20
      ? "blue"
      : "green",
    "#FFFFFF",
  ];
  return (
    <PieChart width={400} height={150}>
      <Pie
        data={data}
        cx={170}
        cy={70}
        innerRadius={40}
        outerRadius={60}
        startAngle={45}
        endAngle={405}
        fill="#FFFFFF"
        paddingAngle={0}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <Label
          value={`${prediction} %`}
          position="center"
          fill="black"
          fontSize={22}
          fontWeight="bold"
        />
      </Pie>
    </PieChart>
  );
};

export default PieCharts;
