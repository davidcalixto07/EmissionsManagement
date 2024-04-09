import axios from 'axios';

const useSidebar = (application, tenant) => {

    function SaveToAPI(assetList) {
        const endpoint = "/api/westapi-colwest2/v1/add?";

        const listToSave = assetList.map(asset => {
            return {
                assetId: asset.assetId,
                name: asset.name
            };
        });

        const requestData = {
            assets: listToSave
        };
        console.log("Saving to API", requestData);

        const params = 'application=' + application + '&tenant=' + tenant
        axios.post(endpoint + params, requestData)
            .then(response => {
                console.log('Saved to API:', response.data);
            })
            .catch(error => {
                console.error('Error saving to API:', error);
            });
    }

    return { SaveToAPI };
}

export default useSidebar;