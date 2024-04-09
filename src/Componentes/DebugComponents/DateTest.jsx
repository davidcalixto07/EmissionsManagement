import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import DatePicker from '../DatePicker/DatePicker';
import useGetAgregates from '../CustomHooks/useGetAgregates';
import { Spinner } from 'react-bootstrap';
import TimeSerie from '../Charts/Timeseries';
import MultiTimeseries from '../Charts/MultiTimeseries';

const DateTest = () => {
    const [state, setState] = useState([
        {
            startDate: addDays(new Date(), -7),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const { agregates, getAgregates, loading, error } = useGetAgregates('4fd1da113e5d449f94c7d8acd4089bc2', 'FlowToTea ');
    useEffect(() => {
        getAgregates(state.startDate, state.endDate);
    }, [state]);

    // useEffect(() => {
    //     console.log("Agregates", agregates);
    //     agregates.map(obj => { console.log(obj) })
    //     console.log("Map", agregates.map(stamp => stamp.flow.average));
    // }, [agregates]);

    return (
        <>
            <div style={{ width: '50vw' }}>
                <DatePicker setDate={setState} />
            </div>
            {loading && <Spinner></Spinner>}
            {error && <h2 style={{ color: 'red' }}>Error: {error.message}</h2>}
            <div style={{ width: '100vw', height: '50vh' }}>
                <MultiTimeseries
                    timestamps={agregates.map(stamp => stamp.endtime)}
                    values={agregates.map(stamp => stamp.flow.average)}
                    label='flow'
                    maxTicks={5}
                    freeRatio />
            </div>
        </>
    );
}

export default DateTest;