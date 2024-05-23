import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts"; // Assuming you have ReactApexChart installed
import { House } from "../hooks/useHouses"; // Assuming House is defined here

interface Props {
  houses: House[];
}

function PredictChart({ houses }: Props) {

  const [categories, setCategories] = useState<string[]>([]); // Type for categories
  const initialOptions = {
    chart: {
      type: "bar",
      height: 400, // Adjusted height for better visualization
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "Value",
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

  
  const [series, setSeries] = useState<any[]>([]); // Temporary type for series
  const [options, setOptions] = useState(initialOptions); // Pre-populate options
 

  const initialSeries: { name: string; data: number[] }[] = []; // Type for series data

 

  useEffect(() => {
    const newSeries: { name: string; data: number[] }[] = [];
    const newCategories: string[] = [];
    

    houses?.forEach((house: House) => { // Type checking for house
      const name = house.location.name + "  house No " + house.houseNumber;
      newCategories.push(name)
      const updatedOptions = {
        ...options, // Spread existing options
        xaxis: {
          categories: newCategories,
        },
      };
      
      setOptions(updatedOptions) 

      const price: { name: string; data: number[] } = { // Type for serie
        name: 'Actual Price',
        data: [Math.floor(house.price)], // Type checking for price and predictedPrice
      };
      const predictedPrice = {
        name: 'Predicted price',
        data: [Math.floor(house.predictedPrice)]
      }
      newSeries.push(price);
      newSeries.push(predictedPrice);

    });
    


    setSeries(newSeries);
    
  }, [houses]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default PredictChart;
