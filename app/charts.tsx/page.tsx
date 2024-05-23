'use client'
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts'; // Assuming you have ReactApexChart installed



  

function ApexChart () {

    const initialSeries = [
        {
          name: 'Website Traffic',
          data: [4000, 1200],
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
