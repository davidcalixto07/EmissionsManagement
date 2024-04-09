import { useState } from 'react';
import axios from 'axios';

const useGetAgregates = (assetId, aspect) => {
    const [agregates, setAgregates] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getQueryType = (start, end) => {
        const timeDifference =  end - start;
        const days = timeDifference / (1000 * 60 * 60 * 24);
        console.log("Difference Days ", days);
        if (days < 31)
            return 'hour';
        else
            if (days < 180)
                return 'day';
            else return 'month'
    };

    const getAgregates = async (from, to, intervalUnit) => {
        setLoading(true);
        setError(null);

        const url = `/api/iottsaggregates/v4/aggregates`
        const params = { assetId: assetId, aspectName: aspect };

        if (from)
            if (typeof (from) === typeof (new Date()))
                params.from = from.toISOString();
            else
                params.from = from;
        if (to)
            if (typeof (from) === typeof (new Date()))
                params.to = to.toISOString();
            else
                params.to = to;

        params.intervalUnit = getQueryType(from, to);

        try {
            const response = await axios.get(url, { timeout: 10000, params: params });
            console.log("Axios Response", response);

            if (response.data.aggregates.length) {
                setAgregates(response.data.aggregates);
                console.log("Set Agregates", response.data);
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
            console.warn("Error gettin agregates", error);
        }
    };

    return { agregates, getAgregates, loading, error };
}

export default useGetAgregates;