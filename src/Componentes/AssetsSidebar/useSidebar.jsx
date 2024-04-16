import axios from "axios";

const useSidebar = (application, tenant) => {
  function SaveToAPI(assetList) {
    const endpoint = "/api/westapi-colwest2/v1/add?";

    const listToSave = assetList.map((asset) => {
      return {
        assetId: asset.assetId,
        name: asset.name,
      };
    });

    const requestData = {
      assets: listToSave,
    };

    const params = "application=" + application + "&tenant=" + tenant;
    axios
      .post(endpoint + params, requestData)
      .then((response) => {
        console.log("Saved to API:", response.data);
      })
      .catch((error) => {
        console.error("Error saving to API:", error);
      });
  }

  async function DeleteAsset(assetId) {
    const res = await axios.delete('/api/assets/DeleteAsset?id=' + assetId);
    return res.data
  }

  return { SaveToAPI, DeleteAsset };
};

export default useSidebar;
