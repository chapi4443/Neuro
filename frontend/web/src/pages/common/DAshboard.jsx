import React from 'react';
import VictoryPieComponent from '../../components/dashboard/Pie';
import VictoryChartComponent from '../../components/dashboard/Chart';

const Dashboard = () => {
  const sampleData = [
    { x: 1, y: 13000 },
    { x: 2, y: 16500 },
    { x: 3, y: 14250 },
    { x: 4, y: 19000 }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <VictoryPieComponent />
      <VictoryChartComponent sampleData={sampleData} />
    </div>
  );
};

export default Dashboard;
