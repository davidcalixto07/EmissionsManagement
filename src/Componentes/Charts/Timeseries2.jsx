import React, { useMemo } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(...registerables);

export function Timeseries2({ title, data, keys, lineWidth, showPoints }) {
    const options = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            borderWidth: lineWidth,
            pointRadius: showPoints,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Chart.js Line Chart",
                },
            },
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: "day",
                        displayFormats: {
                            hour: "MMM dd hh:mm",
                        },
                    },
                },
            },
        }
    }
    );

    options.plugins.title.text = title ?? "";
    options.plugins.title.display = title ? true : false;
    const propArrays = {};

    data.forEach((obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            if (!propArrays[key]) {
                propArrays[key] = [];
            }
            propArrays[key].push(value);
        });
    });

    const labels = propArrays._time;
    delete propArrays._time;

    const datasets = Object.entries(propArrays)
        .filter(([key, value]) => {
            if (keys) return keys.includes(key);
            else return true;
        })
        .map(([key, value]) => ({
            fill: false,
            label: key,
            data: value,
            borderColor: '#0f2d57'
        }));

    const bdata = {
        labels,
        datasets: datasets,
    };

    return <Line options={options} data={bdata} />;
}
