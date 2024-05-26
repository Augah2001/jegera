import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"; // Assuming you have ReactApexChart installed
import { House } from "../hooks/useHouses";

const TenantChart
 = ({ houses }: {houses: House[] |undefined;}) => {
 
    const series =  [{
        name: "tenant count",
        data: [2, 3, 10, ]
      }
    ]
   const  options: any = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },
    
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
        type: 'date',
      categories: ['05/23/2024 GMT', '05/30/2024 GMT', '06/06/2024 GMT'],
      title: {
        text: 'time'
      }
    },
    yaxis: {
      title: {
        text: 'number of tenants'
      },
      min: 0,
      max: 30
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
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
        <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={250} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default TenantChart
;
