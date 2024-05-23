import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts'; // Assuming you have ReactApexChart installed


const initialSeries = [
    {
      name: 'Website Traffic',
      data: [4000, 4500, 5200, 5800, 6300, 5900, 6500, 6200, 7000],
    },
    {
      name: 'App Downloads',
      data: [1200, 1400, 1600, 1800, 1500, 1900, 1700, 2000, 1800],
    },
  ];
  
  const initialOptions = {
    chart: {
      type: 'bar',
      height: 400, // Adjusted height for better visualization
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded',
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },
    fill: {
      opacity: 0.8, // Adjusted opacity for better readability
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val; // Simple value display in tooltip
        },
      },
    },
  };
  

function ApexChart({ initialSeries = [], initialOptions = {} }) {
  const [series, setSeries] = useState(initialSeries);
  const [options, setOptions] = useState(initialOptions);

  // Optional: Update chart data from props if needed (consider performance implications)
  useEffect(() => {
    setSeries(initialSeries);
    setOptions(initialOptions);
  }, [initialSeries, initialOptions]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ApexChart;
