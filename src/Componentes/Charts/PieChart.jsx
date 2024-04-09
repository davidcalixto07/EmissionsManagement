import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
/**
 * Builds a line chart from data.
 * Barchart requieres 2 mandatory props: values and labels
 *
 * @param  {Object[]} values An array of values being the size of the sections
 * @param  {string[]} labels An array of string being the labels of each section
 * @param  {string} legend the title of the chart
 * @param  {string} units the label for the tooltip
 * @return {Line} a JSX component containing chart.
 */
const PieChart = ({ values, labels, legend, units }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: legend,
        text: legend,
      },
    },
  };

  const data = {
    labels: labels ?? [],
    datasets: [
      {
        label: units ?? "",
        data: values ?? [],
      },
    ],
  };
  return <Pie data={data} options={options} />;
};
export default PieChart;
