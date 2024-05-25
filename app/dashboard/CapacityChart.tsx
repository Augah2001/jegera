import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"; // Assuming you have ReactApexChart installed
import { House } from "../hooks/useHouses";

const CapacityChart = ({ houses }: { houses: House[] }) => {
  const series = [
    {
      name: "PRODUCT A",
      data: [44, 55, 41],
    },
    {
      name: "PRODUCT B",
      data: [13, 23, 20],
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    title: {
      text: 'occupant rate',
      align: 'left'
    },
    xaxis: {
      type: "number",
      categories: [1, 2, 3],
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  const [chartOptions, setChartOptions] = useState(options);
  const [chartSeries, setChartSeries] = useState([
    {
      name: "PRODUCT A",
      data: [44, 55, 41],
    },
    {
      name: "PRODUCT B",
      data: [13, 23, 20],
    },
  ]);

  useEffect(() => {
    const newSeries: { name: string; data: number[] }[] = [];
    const newCategories: string[] = [];

    const occupied: number[] = []
    const remaining: number[] = []

    houses?.forEach((house: House) => {
      // Type checking for house
      const name = house.location.name + "  house No " + house.houseNumber;
      newCategories.push(name);
      const updatedOptions = {
        ...options, // Spread existing options
        xaxis: {
          categories: newCategories,
        },
      };

      setChartOptions(updatedOptions);

      occupied.push(house.occupied)
      remaining.push(house.capacity-house.occupied)

      
    });

    setChartSeries([{name: 'occupied', data: occupied}, {name: 'remaining', data: remaining}]);

    
  }, [houses]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={280}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CapacityChart;
