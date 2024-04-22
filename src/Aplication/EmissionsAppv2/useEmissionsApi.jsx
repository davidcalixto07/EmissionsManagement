import axios from 'axios';

function useEmissionsApi() {
    async function CreateDatasource(ds) {
        ds.slot = 0;
        try {
            const response = await axios.post('/api/CreateConnection', ds)
            return response.data
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    async function DeleteDatasource(ds) {
        console.log("Deleting", ds);
        const params = {
            type: ds.type,
            ip: ds.ip
        };
        try {
            const response = await axios.delete('/api/DeleteConnection?' + new URLSearchParams(params))
            return response.data
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    async function CreateDatapoint(ds, dp) {
        const json =
        {
            type: ds.type,
            ip: ds.ip,
            tag: dp,
        }
        try {
            const response = await axios.post('/api/CreateDatapoint', json)
            return response.data
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    async function DeleteDatapoint(ds, dp) {
        const params = {
            type: ds.type,
            ip: ds.ip,
            tag: dp.tag
        };

        try {
            const response = await axios.delete('/api/DeleteDatapoint?' + new URLSearchParams(params))
            return response.data
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    async function GetDatasources() {
        try {
            const response = await axios.get('/api/GetConnections');
            console.log("Get Response", response);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data:', error);
        }
    }

    async function PostDatamappings(json) {
        try {
            const response = await axios.post('/api/assets/SaveMappings', json)
            return response.data
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }


    return { CreateDatasource, DeleteDatasource, CreateDatapoint, DeleteDatapoint, GetDatasources, PostDatamappings };
}
export default useEmissionsApi;




