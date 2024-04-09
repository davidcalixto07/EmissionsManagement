import React, { useEffect, useState } from "react";
import BarChart from "../Charts/BarChart";
import TimeSerie from "../Charts/Timeseries";
import LineChart from "../Charts/LineChart";
import TableChart from "../Charts/TableChart";
import { Calendar } from 'react-date-range';
import './TestStyles.css';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


const GraphsExample = () => {
    const data = [
        {
            label: "barra1",
            data: [1, 2, 4, 2],
        },
        {
            label: "barra2",
            data: [5, 2, 7, 15],
        }
    ]

    const timestamps = ["2023-03-21", "2023-04-22", "2023-05-23"];
    const values = [3, 5, 8];
    const data2 = [
        {
            label: "Año nuevo chino",
            data: [1, 2, 4, 2],
        },
        {
            label: "Año nuevo normal",
            data: [5, 2, 7, 15],
        }
    ];
    const tableData = [["Holasasasa", "asdad", "asas"], ["asdasdad", "fghfhg", "fdfgdfg"]];
    const tableData2 = [["D2", "D3", "D1"], ["aAsdad", "2121fghfhg", "fdfgdfg"]];
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    const [value, onChange] = useState([new Date(), new Date()]);
    return (
        <>
            <div>
                <DateTimeRangePicker onChange={onChange} value={value} />
            </div>
        </>
    );
}

export default GraphsExample