import React, { useState, useEffect } from "react";
import { Chart, registerables, TimeScale } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from 'react-chartjs-2';
import '../style.css';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables, zoomPlugin);

const TimeSerie = ({ timestamps, values, label, chartLegend, max, zero, freeRatio, units, maxTicks = 10 }) => {

  const datavalues = timestamps.map((value, index) => {
    return Object.assign({}, { x: value, x2: value, y: values[index] });
  });

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: !freeRatio ?? true,
    animation: {
      duration: 200
    },
    scales: {
      x: {
        type: "timeseries",
        time: {
          displayFormats: {
            hour: 'MMM-dd HH:mm '
          }
        },
        ticks: {
          font: {
            size: 10,
          },
          autoSkip: true,
          maxTicksLimit: maxTicks
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        beginAtZero: zero ? true : false,
        max: max,
        title:
        {
          display: units ? true : false,
          text: units ?? ""
        }
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: 'ctrl'
          },
          drag: {
            enabled: true,
            modifierKey: 'shift'
          },
          mode: "x",
          speed: 80
        },
        pan: {
          enabled: true,
          mode: "x",
          speed: 0.1
        },
      },
      legend: {
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: chartLegend,
        text: chartLegend,
        font: {
          size: 16
        }
      },
    },
  });

  const data = {
    datasets: [
      {
        label: label,
        data: datavalues,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1.4,
        fill: false,
        pointRadius: 0.1,
      },
    ],
  };

  return (
    <Line data={data} options={chartOptions} />
  );
};

export default TimeSerie;
