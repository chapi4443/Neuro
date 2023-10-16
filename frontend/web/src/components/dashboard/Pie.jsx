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
    <div style={{ width: '300px', height: '300px' }}>
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
    </div>
  );
};

export default VictoryPieComponent;
