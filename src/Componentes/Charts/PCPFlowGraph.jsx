import React from "react";
import LineChart from "../Charts/LineChart";
import {Line} from "react-chartjs-2";

function joinAndSortVectors(vector1, vector2) {
    // Combines the two vectors using the spread operator
    let vectorCombined = [...vector1, ...vector2];
    // Sorts the combined vector from smallest to largest
    vectorCombined.sort(function(a, b) {
        return a - b;
    });
    return vectorCombined;
}


function neighboringFrequencies(posible_Neighbors, freq) {
    let neighbors = [];
    let diff1 = Number.MAX_SAFE_INTEGER; // Initialize the first difference with a large value
    let diff2 = Number.MAX_SAFE_INTEGER; // Initialize the second difference with a large value

    for (let num of posible_Neighbors) {
        let distancia = Math.abs(num - freq); // Calculate the absolute difference between X and the current number

        if (distancia < diff1) {
            neighbors.unshift(num); // Place the current number in the first position of the neighbor array
            diff2 = diff1; // The second difference is now equal to the first.
            diff1 = distancia; // We update the first minimum difference
        } else if (distancia < diff2) {
            neighbors.splice(1, 0, num); // Insert the current number in the second position of the neighbor array
            diff2 = distancia; // We update the second minimum difference
        }
    }
    return neighbors;
}

function nuller(Frecuency, head, heads) {
    var actual_flow = []
    var actual_point_flow = pcp_surface(Frecuency, head)
    for (var i = 0; i < heads.length; i++) {
        if((head).toFixed(2) === heads[i] ){
            actual_flow.push(actual_point_flow)
        }
        else{
            actual_flow.push(null)
        }
    } 
    return actual_flow;
}


/**
 * 
 * @param {float} freq  Pump frequency (Hz)
 * @param {float} head Pump head (PSI)
 * @returns inferred flow (BPD)
 */
function pcp_surface(freq, head) {
    var flow = 0
    var rpm = 0
    rpm = freq * 20
    flow = 21.432646940574813 + 5.83851086e-01 * rpm - 9.61629535e-02 * head + 5.34971303e-05 * rpm ** 2 + 8.37929113e-05 * rpm * head - 9.12475671e-04 * head ** 2 - 4.30028770e-08 * rpm ** 3 - 7.54254972e-08 * rpm ** 2 * head - 1.42693302e-07 * rpm * head ** 2 - 1.33253906e-05 * head ** 3
    flow = (flow * 34.2857)
    return flow;
}


const Graph = ({Frecuency, Discharge_pressure, Suction_pressure,freeAspect}) => {

    //variables inisialization
    var possible_neighbors = [0,5,10,15,20,25,30,35,40,45,50,55,60,65] //in Hz
    var neighbors = neighboringFrequencies(possible_neighbors, Frecuency);
    var lower_freq = neighbors[0]
    var upper_freq = neighbors[1]
    var top_neighbor_flows  = []
    var down_neighbor_flows = []
    var flows = []

    //labels (x axis)
    var actual_head = (Discharge_pressure - Suction_pressure)
    var step = (actual_head / 10)
    // var step_heads = [step, step * 2, step * 4, step * 6, step * 8, head, step * 12, step * 14]
    var step_heads = [1, 2, 4, 6, 8, 10, 12, 14].map(factor => (step * factor).toFixed(2));
    var all_heads = [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140]
    var heads = joinAndSortVectors(step_heads, all_heads)
    

    //values (y axis)
    var actual_flow = nuller(Frecuency, actual_head, heads)
    for (var i = 0; i < heads.length; i++) {
        flows[i] = pcp_surface(Frecuency, heads[i]);
        down_neighbor_flows[i] = pcp_surface(lower_freq, heads[i]);
        top_neighbor_flows[i] = pcp_surface(upper_freq, heads[i]);
    }

    const values = [
        {
            label: "Curve at operation conditions: " + Frecuency + " Hz",
            data: flows,
            pointRadius:  0.1,
            borderWidth: 1.5 ,
            backgroundColor: '#34acde',
            borderColor: '#34acde',
        },
        
        {
            label: "Curve at: " + lower_freq + " Hz",
            data: down_neighbor_flows,
            pointRadius:  0.1,
            borderWidth: 1.5 ,
            backgroundColor: '#e5352c',
            borderColor: '#e5352c',
        },
        {
            label: "Curve at: " + upper_freq + " Hz",
            data: top_neighbor_flows,
            pointRadius:  0.1,
            borderWidth: 1.5 ,
            backgroundColor: '#e5352c',
            borderColor: '#e5352c',
        }
        ,
        {
            label: "Operation point",
            data: actual_flow,
            pointRadius: 7,
            borderWidth: 3,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
        },
    ]
    const options = {
        responsive: true,
        // maintainAspectRatio: !freeAspect ?? true,
        scales: {
            x: {
            title: {
                display: true,
                text: "head (psi)"
            }
            },
            y: {
            title: {
                display: true,
                text: "flow (gpm)"
            }
            }
        }
        }
    
        const data = {
        labels: heads?? ['No data'],
        datasets: values,
        };
    
        return (
            <div>
                 <Line data={data} options={options}/>
            </div>
        );
}

export default Graph;
