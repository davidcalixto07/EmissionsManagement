import React from "react";
import { Pie } from "react-chartjs-2";

/**
 * PieChart component to display a pie chart.
 *
 * @param  {Object} props - Props for the PieChart component.
 * @param  {number[]} props.values - An array of values representing the size of the sections.
 * @param  {string[]} props.labels - An array of strings representing the labels of each section.
 * @param  {string} [props.legend=""] - The title of the chart.
 * @param  {string} [props.units=""] - The label for the tooltip.
 * @returns {JSX.Element} - PieChart component.
 */
const PieChart = ({ values, labels, legend = "", units = "" }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "rgba(199, 0, 57, 0.6)",
          "rgba(255, 87, 51, 0.6)",
          "rgba(255, 255, 0 , 0.6)",
          "rgba(0, 255,0, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(232, 37, 75, 0.6)",
          "rgba(51, 167, 184, 0.6)",
          "rgba(199, 92, 54, 0.6)",
          "rgba(120, 221, 119, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: legend,
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
