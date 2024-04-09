import { useState} from 'react';
import axios from 'axios';


const useApi = (endpoint) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(endpoint,{timeout:10000});
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
}

export default useApi;