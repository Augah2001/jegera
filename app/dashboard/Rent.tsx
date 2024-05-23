import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"; // Assuming you have ReactApexChart installed
import { House } from "../hooks/useHouses";

const RentCharts
 = ({ houses }: {houses: House[]}) => {
 
    const series =  [{
        name: "Income",
        data: [100, 250, 330]
    }]
   const  options ={
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'weekly income',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        type: 'date',
        categories: ['05/23/2024 GMT', '05/30/2024 GMT', '06/06/2024 GMT'],
      },
      yaxis: {
        title: {
          text: 'amount'
        },
        min: 0,
        max: 1000
      }
    }
  
  
  

  const [chartOptions, setChartOptions] = useState(options);
  const [chartSeries, setChartSeries] = useState(series);

//   useEffect(() => {
//     const newSeries: { name: string; data: number[] }[] = [];
//     const newCategories: string[] = [];

//     houses?.forEach((house: House) => {
      // Type checking for house
    //   const name = house.location.name + "  house No " + house.houseNumber;
    //   newCategories.push(name);
    //   const updatedOptions = {
    //     ...options, // Spread existing options
    //     xaxis: {
    //       categories: newCategories,
    //     },
    //   };

    //   setChartOptions(updatedOptions);

    //   const price: { name: string; data: number[] } = {
    //     // Type for serie
    //     name: "occupied",
    //     data: [house.occupied], // Type checking for price and predictedPrice
    //   };
    //   const predictedPrice = {
    //     name: "remaining",
    //     data: [house.capacity- house.occupied],
    //   };

    //   console.log(newSeries);
    //   newSeries.push(price);
    //   newSeries.push(predictedPrice);
    // });

//     setChartSeries(newSeries);

//     setChartSeries(newSeries);
//   }, [houses]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default RentCharts
;
