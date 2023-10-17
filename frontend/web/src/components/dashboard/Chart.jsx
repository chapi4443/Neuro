// VictoryChartComponent.js
import React from 'react';
import { VictoryChart, VictoryLine, VictoryContainer } from 'victory';

const VictoryChartComponent = ({ sampleData }) => {
  return (
    <div style={{ width: '400px', height: '400px' }}>
      <VictoryChart
        containerComponent={<VictoryContainer responsive={false} />}
        domainPadding={{ x: 20 }}
      >
        <VictoryLine
          style={{
            data: { stroke: "#095ee8" }
          }}
          data={sampleData}
          x="Date"
          y="Percent"
        />
      </VictoryChart>
    </div>
  );
};

export default VictoryChartComponent;
