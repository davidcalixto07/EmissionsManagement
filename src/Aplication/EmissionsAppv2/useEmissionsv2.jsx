import { useEffect, useState } from "react";
import { TestData } from "./times";

function useEmissionsV2() {
  const [imageSrc, setImageSrc] = useState(null);
  const [coordinates, setCoordinates] = useState({ start: "0,0", end: "0.0" });
  const [sidebarList, setSidebarList] = useState([]);
  const [teasList, setTeasList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (sidebarList.length === 0) {
      setLoading(false);
      return;
    }
    const url = `/api/assetmanagement/v3/assets?filter={"assetId": {"in": {"value": [${sidebarList.map(
      (tea) => `"${tea.assetId}"`
    )}]}}}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          throw new Error("Failed to fetch teas");
        }
        return response.json();
      })
      .then((json) => {
        const assets = json._embedded.assets;
        setTeasList(assets);
        console.warn(assets);
        GetTeasTs(assets);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      })
      .finally(() => { });
  }, [sidebarList]);

  function GetTeasTs(teaslist) {
    const currentDate = new Date();
    currentDate.setDate(1);
    const isoStartDate = currentDate.toISOString();
    console.log("Getting Teas", teasList);

    const promises = teaslist.map(async (tea) => {
      const url = `/api/emissionsapi2-colwest2/v1/ProcessTimeserie?assetId=${tea.assetId}&from=${isoStartDate}&model=both`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for assetId ${tea.assetId}`);
      }
      const json = await response.json();
      console.log("Api response from ", tea,);
      tea.timeSerie = Array.isArray(json) ? json : [];
      var sum1 = 0, sum2 = 0;

      json.forEach(point => {
        sum1 += point.emissions.anh.C02 ?? 0;
        sum2 += point.emissions.anh.CO2e ?? 0;
      });
      tea.avgEmissions = sum1 / json.length;
      tea.avgEqEmissions = sum2 / json.length;
      console.log("Tea", tea);
      setLoading(false);
      return tea;
    });

    Promise.all(promises)
      .then((updatedTeas) => {
        console.log("Teas with fetched data:", updatedTeas);
        setTeasList(updatedTeas);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function fetchImage() {
    fetch("/api/emissionsapi2-colwest2/v1/getImage?tenant=colwest2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.blob();
      })
      .then((blob) => {
        const imageURL = URL.createObjectURL(blob);
        setImageSrc(imageURL);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }

  function fetchConfig() {
    fetch("/api/emissionsapi2-colwest2/v1/loadCoordinates?tenant=colwest2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.json();
      })
      .then((coords) => {
        console.log("Coordinates", coords);
        setCoordinates(coords);
      })
      .catch((error) => {
        console.error("Error fetching coordinates:", error);
      });
  }

  useEffect(() => {
    fetchImage();
    fetchConfig();
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, []);

  return { teasList, setSidebarList, coordinates, imageSrc, loading };
}
export default useEmissionsV2;
