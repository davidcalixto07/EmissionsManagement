import React from "react";
import { Line } from "react-chartjs-2";

/**
 * Builds a line chart from data.
 * Barchart requieres 2 mandatory props: values and labels
 *
 * @param  {Object[]} values An array of objects, one for each line like {
                                      label: "Label1",
                                      data: [1, 2, 3] //Being data the values of the 
                                  }
 * @param  {string[]} labels An array of string being the labels of the x Axis
 * @param  {string} legend the title of the chart
 * @param  {boolean} fixedRatio boolean for the chart to conserve rectangular aspect when false or take the container aspect when true
 * @param  {boolean} area boolean for the chart to fill the line area
 * @param  {string} yUnits the label for the y Axis
 * @param  {string} xUnits the label for the x Axis
 * @param  {string[]} aditionalAxes an array of string with the labels of the new axes
 * @return {Line} a JSX component containing chart. 
 */
const LineChart = ({ labels, values, legend, area, fixedRatio, yUnits = '', xUnits = '', aditionalAxes }) => {

  if (!!!values.length)
    values = [{ label: 'No data' }];

  const options = {
    maintainAspectRatio: fixedRatio ?? false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: legend,
        text: legend,
      },
    },
    scales: {
      y: {
        title: {
          display: yUnits,
          text: yUnits
        }
      },
      x: {
        title: {
          display: xUnits,
          text: xUnits
        }
      }
    }
  }

  if (aditionalAxes) {
    aditionalAxes.forEach((axis, index) => {
      options.scales[`y${index + 2}`] = {
        title: {
          display: true,
          text: axis
        },
        position: 'right',
      };
    });
  }

  if (area)
    values = values.map(obj => ({
      ...obj,
      fill: true
    }));

  const data = {
    labels: labels ?? ['No data'],
    datasets: values,
  };

  return <Line data={data} options={options} />;
};
export default LineChart;
