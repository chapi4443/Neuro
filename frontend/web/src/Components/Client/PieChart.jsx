import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const data = [
  { name: "Group A", value: 0.5 },
  { name: "Group B", value: 1 - 0.5},
];
const COLORS = [
  data[0].value >= 0.9 ? "red" :data[0].value >= 0.5 ? "yellow" :data[0].value >= 0.2 ? "blue" : "green",
  "#FFFFFF",
];

export default class PieCharts extends PureComponent {
  render() {
    return (
      <PieChart width={400} height={150} onMouseEnter={this.onPieEnter}>
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
            value={`${data[0].value * 100}%`}
            position="center"
            fill="black"
            fontSize={22}
            fontWeight={"bold"}
          />
        </Pie>
      </PieChart>
    );
  }
}
