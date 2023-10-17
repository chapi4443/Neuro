// Dashboard.js
import React from 'react';
import { Box } from '@mui/material';
import VictoryPieComponent from '../../components/dashboard/Pie';
import VictoryChartComponent from '../../components/dashboard/Chart';

const Dashboard = () => {
  const sampleData = [
    { Date: '11-10-2022', Percent: 20 },
    { Date: '12-10-2022', Percent: 30 },
    { Date: '13-10-2022', Percent: 50 },
    { Date: '14-10-2022', Percent: 70 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50vh' }}>
      
      <Box
        sx={{
          width: '30%',
          height: '300px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '40%',
            height: '80%',
            backgroundColor: 'lightblue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding:"2rem"
          }}
        >
          {/* Content for the nested Box */}
          You have taken 24 assessment
        </Box>
        <VictoryPieComponent />
      
      </Box>
      <VictoryChartComponent sampleData={sampleData} />
    </div>
  );
};

export default Dashboard;
