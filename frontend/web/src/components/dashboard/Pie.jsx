// VictoryPieComponent.js
import React, { useState, useEffect } from 'react';
import { VictoryPie } from 'victory';

const VictoryPieComponent = () => {
  const stopPercent = 75; // Adjust this value to the desired percentage at which the animation should stop
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prevPercent) => (prevPercent < stopPercent ? prevPercent + 1 : stopPercent));
    }, 100);

    if (percent === stopPercent) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [percent, stopPercent]);

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        marginRight: '50px',
        position: 'relative',
        border: '2px solid #ccc',
        backgroundColor:'#98d8f9',
        borderRadius: '15px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '24px' }}>{percent}%</div>
        <div style={{ fontSize: '12px' }}>Risk</div>
      </div>
      <svg height={300} width={300}>
        <VictoryPie
          standalone={false}
          width={300}
          height={300}
          data={[{ x: 1, y: percent }, { x: 2, y: 100 - percent }]}
          innerRadius={65}
          cornerRadius={10}
          colorScale={['tomato', 'white']}
          animate={{ duration: 100 }}
          style={{ labels: { display: 'none' } }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '14px',
        }}
      >
        <a href="/assessment-retake-link">Retake the Assessment</a>
      </div>
    </div>
  );
};

export default VictoryPieComponent;
