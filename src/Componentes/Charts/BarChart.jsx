import React from "react";
import { Bar } from "react-chartjs-2";

/**
 * Builds a bar chart from data.
 * Barchart requieres 2 mandatory props: data and labels
 * @param  {string[]} labels An array of string being the labels of the x Axis
 * @param  {Object[]} data An array of objects like {
                                      label: "Label1",
                                      data: [1, 2, 3] //Being data the values of the 
                                  }
 * @param  {string} legend the title of the chart
 * @param  {boolean} horizontal boolean to orientate the chart horizontally if true
 * @param  {number} barWidth the widht in pixels of the bars
 * @param  {boolean} fixedRatio boolean for the chart to conserve rectangular aspect when false or take the container aspect when true
 * @param  {boolean} stacked boolean for the chart to stack the bars
 * @param  {string} yUnits the label for the y Axis
 * @param  {string} xUnits the label for the x Axis
 * @param  {string[]} aditionalAxes an array of string with the labels of the new axes
 * @return {Bar} a JSX component containing chart. 
 */
const BarChart = ({ labels, data, legend, horizontal, barWidth, fixedRatio, stacked, yUnits = '', xUnits = '', aditionalAxes, legendPos }) => {

  let options = {
    indexAxis: horizontal ? 'y' : 'x',
    responsive: true,
    barThickness: barWidth ?? 40,
    maintainAspectRatio: fixedRatio ?? false,
    backgroundColor: 'rgba(15, 45, 87, 0.9)',
    borderColor: 'rgba(0, 20, 90, 1)',
    plugins: {
      legend: {
        position: legendPos?? 'top',
      },
      title: {
        display: legend,
        text: legend,
      },
    },
    scales: {
      y: {
        stacked: stacked,
        position: "left",
        title: {
          display: yUnits,
          text: yUnits
        }
      },
      x: {
        stacked: stacked,
        title: {
          display: xUnits,
          text: xUnits
        }
      }
    }
  };

  if (aditionalAxes) {
    aditionalAxes.forEach((axis, index) => {
      options.scales[`y${index + 2}`] = {
        title: {
          display: true,
          text: axis
        },
        position: "right",
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      };
    });
  }

  const outLabels = labels?.length ? labels : ['No Data'];
  const dataArray = data?.length ? data : [{ label: 'No Data' }];

  const dataSets = {
    labels: outLabels,
    backgroundColor: 'rgba(255, 99, 132, 0.6)',
    datasets: dataArray,
  };

  return (
    <Bar options={options} data={dataSets} />
  );
};

export default BarChart;
