import { useState } from 'react';
import axios from 'axios';

const useGetTimeseries = () => {
    const [timeSeries, setTimeSeries] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const resetData = () => { setTimeSeries([]) };

    const fetchData = async (assetId, aspect, from, to, limit) => {
        setLoading(true);
        setError(null);

        const url = `/api/iottimeseries/v3/timeseries/${assetId}/${aspect}`
        const params = { sort: 'desc' };

        if (from)
            if (typeof (from) === typeof (new Date()))
                params.from = from.toISOString();
            else
                params.from = from;
        if (to)
            if (typeof (to) === typeof (new Date()))
                params.to = to.toISOString();
            else
                params.to = to;

        if (limit)
            params.limit = limit;

        try {
            const response = await axios.get(url, { timeout: 5000, params: params });
            if (response.data.length)
                setTimeSeries(response.data);
            else
                setTimeSeries([]);

            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return { timeSeries, fetchData, loading, error, resetData };
}

export default useGetTimeseries;