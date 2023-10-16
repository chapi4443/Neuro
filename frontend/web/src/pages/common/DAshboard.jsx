// Dashboard.js
import React from 'react';
import VictoryPieComponent from '../../components/dashboard/Pie';
import VictoryChartComponent from '../../components/dashboard/Chart';

const Dashboard = () => {
  const sampleData = [
    { Date: '11-10-2022', Percent: 20 },
    { Date: '12-10-2022', Percent: 30 },
    { Date: '13-10-2022', Percent: 50 },
    { Date:'14-10-2022', Percent: 70 }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <VictoryPieComponent />
      <VictoryChartComponent sampleData={sampleData} />
    </div>
  );
};

export default Dashboard;
