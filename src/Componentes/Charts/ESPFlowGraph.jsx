import React from "react";
import { Line } from "react-chartjs-2";


function neighboringFrequencies(posibleneighbors, freq) {
    let neighbors = [];
    let diff1 = Number.MAX_SAFE_INTEGER; // Initialize the first difference with a large value
    let diff2 = Number.MAX_SAFE_INTEGER; // Initialize the second difference with a large value

    for (let num of posibleneighbors) {
        let distancia = Math.abs(num - freq); // Calculate the absolute difference between X and the current number
        if (distancia !== 0) {
            if (distancia < diff1) {
                neighbors.unshift(num); // Place the current number in the first position of the neighbor array
                diff2 = diff1; // The second difference is now equal to the first.
                diff1 = distancia; // We update the first minimum difference
            } else if (distancia < diff2) {
                neighbors.splice(1, 0, num); // Insert the current number in the second position of the neighbor array
                diff2 = distancia; // We update the second minimum difference
            }
        }

    }
    return neighbors;
}



/**
 * 
 * @param {float} speed  Pump frequency (Hz)
 * @param {float} head Pump head (PSI)
 * @returns inferred flow (BPD)
 */
function esp_surface(speed, head) {

    var flow = -1042.5054469607676 + 6.34961374e+02 * speed - 5.28521089e+01 * head - 1.16978039e+01 * speed ** 2 + 2.12522888e+00 * speed * head - 2.16701216e-02 * head ** 2 + 1.08284624e-01 * speed ** 3 - 2.17616230e-02 * speed ** 2 * head + 3.93507971e-04 * speed * head ** 2 - 1.40530506e-06 * head ** 3

    return (flow).toFixed(2)
}

function nullerVector(heads) {
    var nullVector = []
    for (var i = 0; i < heads.length; i++) {
        nullVector.push(null)
    }
    return nullVector
}


const Graph = ({ Frecuency, Discharge_pressure, Suction_pressure, freeAspect }) => {

    var Frecuency = 55
    //variables inisialization
    var possible_neighbors = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75] //in Hz
    var neighbors = neighboringFrequencies(possible_neighbors, Frecuency);

    //cone 1
    var coneHeads1 = [754.0322581, 931.4516129, 1120.967742, 1330.645161, 1455.645161]
    var coneFlows1 = [10071.25891, 11116.38955, 12232.7791, 13301.66271, 13990.49881]
    
    //cone 2
    var coneHeads2 = [1266.129032, 1560.483871, 1887.096774, 2241.935484, 2467.741935]
    var coneFlows2 = [3705.463183, 4109.263658, 4489.311164, 4893.111639, 5178.147268]
    coneHeads2 = nullerVector(coneHeads1).concat(coneHeads2)

    //cone 3
    var coneHeads3 = [1032.258065, 1274.193548, 1544.354839, 1826.612903, 2012.096774]
    var coneFlows3 = [6912.114014, 7672.209026, 8432.304038, 9192.39905, 9667.458432]
    coneHeads3 = nullerVector(coneHeads2).concat(coneHeads3)

    //data 55hz
    var principalHeads = [2379.032258, 2383.064516, 2302.419355, 2161.290323, 1959.677419
        , 1741.935484, 1508.064516, 1237.903226, 1004.032258, 814.516129, 500, 129.0322581, 20.16129032]
    var principalFlows = []
    for (var i = 0; i < principalHeads.length; i++) {
        principalFlows[i] = esp_surface(Frecuency, principalHeads[i]);  //60 hz
    }
    principalHeads = nullerVector(coneHeads3).concat(principalHeads)


    //data 60 hz
    var downNeighborHeads = [2379.032258, 2383.064516, 2302.419355, 2161.290323, 1959.677419
        , 1741.935484, 1508.064516, 1237.903226, 1004.032258, 814.516129, 500, 129.0322581, 20.16129032]
    var downNeighborFlows = []
    for (var i = 0; i < downNeighborHeads.length; i++) {
        downNeighborFlows[i] = esp_surface(neighbors[1], downNeighborHeads[i]);  //55 Hz
    }
    downNeighborHeads = nullerVector(principalHeads).concat(downNeighborHeads)


    //data 50 hz
    var topNeighborHeads = [2379.032258, 2383.064516, 2302.419355, 2161.290323, 1959.677419
        , 1741.935484, 1508.064516, 1237.903226, 1004.032258, 814.516129, 500, 129.0322581, 20.16129032]
    var topNeighborFlows = []
    for (var i = 0; i < topNeighborHeads.length; i++) {
        topNeighborFlows[i] = esp_surface(neighbors[0], topNeighborHeads[i]);  //50 Hz
    }
    topNeighborHeads = nullerVector(downNeighborHeads).concat(topNeighborHeads)

    //operation point
    var principalHead = [1741.935484]
    var principalFlow = []
    principalFlow[0] = esp_surface(Frecuency, principalHead[0]);  //60 hz
    principalHead = nullerVector(topNeighborHeads).concat(principalHead)

    //data for graph
    let data1 = {
        labels: coneFlows1,
        datasets: [{
            label: 'Lower efficiency limit',
            data: coneHeads1,
            pointRadius: 1,
            borderWidth: 1.5,
            backgroundColor: '#84b819',
            borderColor: '#84b819',
            fill: false
        }]
    };
    let data2 = {
        labels: coneFlows2,
        datasets: [{
            label: 'upper efficiency limit',
            data: coneHeads2,
            pointRadius: 1,
            borderWidth: 1.5,
            backgroundColor: '#84b819',
            borderColor: '#84b819',
            fill: false
        }]
    };
    let data3 = {
        labels: coneFlows3,
        datasets: [{
            label: 'maximum efficiency',
            data: coneHeads3,
            pointRadius: 1,
            borderWidth: 1.5,
            backgroundColor: '#84b819',
            borderColor: '#84b819',
            fill: false
        }]
    };
    let data4 = {
        labels: principalFlows,
        datasets: [{
            label: "Curve at operation conditions: " + Frecuency + " Hz",
            data: principalHeads,
            fill: false,
            pointRadius: 0.5,
            borderWidth: 1.5,
            backgroundColor: '#34acde',
            borderColor: '#34acde',

        }]
    };
    let data5 = {
        labels: downNeighborFlows,
        datasets: [{
            label: "Curve at: " + neighbors[1] + " Hz",
            data: downNeighborHeads,
            fill: false,
            pointRadius: 0.1,
            borderWidth: 1.5,
            backgroundColor: '#e5352c',
            borderColor: '#e5352c',
        }]
    };
    let data6 = {
        labels: topNeighborFlows,
        datasets: [{
            label: "Curve at: " + neighbors[0] + " Hz",
            data: topNeighborHeads,
            fill: false,
            pointRadius: 0.1,
            borderWidth: 1.5,
            backgroundColor: '#e5352c',
            borderColor: '#e5352c',
        }]
    };
    let data7 = {
        labels: principalFlow,
        datasets: [{
            label: 'Operation point',
            data: principalHead,
            fill: false,
            pointRadius: 5,
            borderWidth: 1,
            backgroundColor: '#34acde',
            borderColor: '#34acde',
        }]
    };


    // graph configuration 
    let options = {
        responsive: true,
        // maintainAspectRatio: !freeAspect ?? true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                title: {
                    display: true,
                    text: 'flow (BDP)'
                }
            },
            y: {
                position: 'left',
                min: 0,
                title: {
                    display: true,
                    text: 'Head (PSI)'
                }
            }
        }
    };

    const data = {
        labels: data1.labels.concat(data2.labels, data3.labels, data4.labels,
            data5.labels, data6.labels, data7.labels), // Combines the headers of all datasets
        datasets: data1.datasets.concat(data2.datasets, data3.datasets, data4.datasets,
            data5.datasets, data6.datasets, data7.datasets) //  Combines the flows of all datasets
    };

    return (
       
            <Line data={data} options={options} />
        
    );
}

export default Graph;
